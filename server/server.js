const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const ldap = require("ldapjs");
const { sendEmail } = require("./emailService");
const cron = require("node-cron");

const app = express();
app.use(express.json());
app.use(cors());

const path = require("path"); // Add this line to work with file paths

// Serve static files from the React app's dist folder
app.use(express.static(path.join(__dirname, "dist")));

const db = mysql.createConnection({
  // host: "docker.host.internal",
  // host: "database",
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "nanopass",
  database: process.env.DB_NAME || "form-eval",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    throw new Error(err);
    // console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Cache for LDAP configuration
let ldapConfig = null;

// Function to fetch LDAP configuration from database
function fetchLdapConfig(callback) {
  if (ldapConfig) {
    return callback(null, ldapConfig);
  }

  const configQuery =
    'SELECT param_key, param_value FROM parametres_de_base WHERE param_key IN ("ServeurLDAP", "baseDN", "DN_cmpt", "LDAP_password" , "LDAP_port")';
  db.query(configQuery, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return callback(err);
    }

    if (results.length < 4) {
      const error = new Error("Incomplete LDAP configuration found");
      console.error(error);
      return callback(error);
    }

    ldapConfig = results.reduce((config, row) => {
      config[row.param_key] = row.param_value;
      return config;
    }, {});

    callback(null, ldapConfig);
  });
}

// LDAP Authentication Function
function ldapAuthenticate(username, password, callback) {
  fetchLdapConfig((err, config) => {
    if (err) {
      console.error("Error fetching LDAP config:", err);
      return callback(err, null);
    }

    try {
      const client = ldap.createClient({
        // url: `ldap://${config.ServeurLDAP}:389`,
        url: `ldap://${config.ServeurLDAP}:${config.LDAP_port}`,
      });

      let responseSent = false; // Track if the response has been sent so that the server don't crash for multiple err response

      const handleResponse = (err, result) => {
        if (!responseSent) {
          responseSent = true;
          callback(err, result);
        }
      };

      client.on("error", (err) => {
        console.error("LDAP client error:", err);
        return handleResponse(err, null); // Handle client error
      });

      const dn = `uid=${username},ou=users,${config.baseDN}`;

      client.bind(config.DN_cmpt, config.LDAP_password, (err) => {
        if (err) {
          console.error("LDAP admin bind error:", err);
          client.unbind();
          return handleResponse(err, null);
        }

        const opts = {
          filter: `(uid=${username})`,
          scope: "sub",
          attributes: ["uid", "cn", "sn", "givenName", "title", "mail"],
        };

        client.search(`ou=users,${config.baseDN}`, opts, (err, res) => {
          if (err) {
            console.error("LDAP search error:", err);
            client.unbind();
            return handleResponse(err, null);
          }

          let user = null;

          res.on("searchEntry", (entry) => {
            user = JSON.stringify(entry.pojo);
            user = JSON.parse(user);
          });

          // res.on("searchReference", (referral) => {
          // console.log("Referral:", referral.uris.join());
          // });

          res.on("error", (err) => {
            console.error("LDAP search error event:", err.message);
            client.unbind();
            return handleResponse(err, null);
          });

          res.on("end", (result) => {
            if (result.status !== 0 || !user) {
              console.error("LDAP search end error or user not found:", result);
              client.unbind();
              return handleResponse(new Error("User not found"), null);
            }

            client.bind(dn, password, (err) => {
              client.unbind();

              if (err) {
                console.error("LDAP user bind error:", err);
                return handleResponse(new Error("Invalid credentials"), null);
              }

              handleResponse(null, user);
            });
          });
        });
      });
    } catch (error) {
      console.error("Unexpected error during LDAP operation:", error);
      return callback(error, null);
    }
  });
}

const extractAttributes = (attributes) => {
  if (!attributes || !Array.isArray(attributes)) {
    console.error("Invalid attributes format:", attributes);
    return {};
  }

  const attributeMap = {};
  attributes.forEach((attr) => {
    if (attr.type && attr.values && Array.isArray(attr.values)) {
      attributeMap[attr.type] = attr.values[0]; // Assuming you want the first value
    } else {
      console.error("Invalid attribute format:", attr);
    }
  });
  return attributeMap;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username.startsWith("sona")) {
    ldapAuthenticate(username, password, (err, ldapUser) => {
      if (err) {
        console.error("LDAP authentication failed:", err);
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Extract LDAP user attributes
      const ldapUserAttributes = extractAttributes(ldapUser.attributes);
      const { uid, sn, givenName, title, mail } = ldapUserAttributes;

      // Check if the user exists in the database
      db.query(
        "SELECT * FROM utilisateur WHERE username = ?",
        [username],
        (error, results) => {
          if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal server error" });
          }

          if (results.length === 0) {
            // If the user does not exist, insert them into the database
            db.query(
              "INSERT INTO utilisateur (username, password, nom, prenom, fonction, email, role_default) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [uid, password, sn, givenName, title, mail, "Participant"],
              (insertError, insertResults) => {
                if (insertError) {
                  console.error("Database insert error:", insertError);
                  return res
                    .status(500)
                    .json({ error: "Internal server error" });
                }

                const newUserId = insertResults.insertId;
                db.query(
                  "INSERT INTO userrole (utilisateurID, roleID) VALUES (?, ?)",
                  [newUserId, 1],
                  (roleError) => {
                    if (roleError) {
                      console.error("Database role insert error:", roleError);
                      return res
                        .status(500)
                        .json({ error: "Internal server error" });
                    }

                    return res.status(200).json({
                      message: "Login successful",
                      user: {
                        username: uid,
                        nom: sn,
                        prenom: givenName,
                        fonction: title,
                        email: mail,
                        role_default: "Participant",
                      },
                    });
                  }
                );
              }
            );
          } else {
            // If the user already exists, return the user data
            const user = results[0];
            return res.status(200).json({ message: "Login successful", user });
          }
        }
      );
    });
  } else if (username.startsWith("local") || username === "root") {
    db.query(
      "SELECT * FROM utilisateur WHERE username = ? AND password = ?",
      [username, password],
      (error, results) => {
        if (error) {
          console.error("Database query error:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
        const user = results[0];
        return res
          .status(200)
          .json({ message: "Login successful", user: user });
      }
    );
  } else {
    res.status(400).json({ error: "Invalid username format" });
  }
});

app.get("/AdminFormation/formations_non_cloture/:userID?", (req, res) => {
  const { userID } = req.params;

  let query;
  let queryParams = [];

  if (userID) {
    query = `
      SELECT f.*
      FROM formation f
      JOIN participation p ON f.formationID = p.formationID
      WHERE p.utilisateurID = ? AND f.date_fin_questionnaire > NOW()
    `;
    queryParams = [userID];
  } else {
    query = "SELECT * FROM formation WHERE date_fin_questionnaire > NOW()";
  }

  db.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json(results);
  });
});

app.get("/AdminFormation/formations_cloture/:userID?", (req, res) => {
  const { userID } = req.params;

  let query;
  let queryParams = [];

  if (userID) {
    query = `
      SELECT f.*
      FROM formation f
      JOIN participation p ON f.formationID = p.formationID
      WHERE p.utilisateurID = ? AND f.date_fin_questionnaire < NOW()
    `;
    queryParams = [userID];
  } else {
    query = "SELECT * FROM formation WHERE date_fin_questionnaire < NOW()";
  }

  db.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json(results);
  });
});

app.put("/api/user", (req, res) => {
  const { username, fieldsToUpdate } = req.body;

  // Extract fields and values to update from the request body
  const updateFields = Object.keys(fieldsToUpdate);
  const updateValues = Object.values(fieldsToUpdate);

  // Construct the SET clause for the SQL query dynamically
  const setClause = updateFields.map((field) => `${field} = ?`).join(", ");

  const query = `UPDATE utilisateur SET ${setClause} WHERE username = ?`;

  updateFields.push("username");
  updateValues.push(username);

  // Execute the SQL query with the dynamically constructed SET clause and values
  db.query(query, updateValues, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "User information updated successfully" });
  });
});

app.get("/api/structure/:id?", (req, res) => {
  const structureID = req.params.id;

  if (structureID) {
    // If ID is defined, perform its usual work
    db.query(
      "SELECT * FROM structure WHERE structureID = ?",
      [structureID],
      (error, results) => {
        if (error) {
          console.error("Database query error:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Structure not found" });
        }

        res.status(200).json(results[0]);
      }
    );
  } else {
    // If ID is undefined, fetch all structures
    db.query("SELECT * FROM structure", (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json(results);
    });
  }
});

app.get("/allUsers", (req, res) => {
  db.query("SELECT * FROM utilisateur", (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

// Create a new formation
app.post("/api/formation", (req, res) => {
  const {
    intitule,
    org_formateur,
    nom_formateur,
    lieu,
    date_debut,
    date_fin,
    date_debut_questionnaire,
    date_fin_questionnaire,
  } = req.body;

  const query = `
  INSERT INTO formation (intitule, org_formateur, nom_formateur, lieu, date_debut, date_fin, date_debut_questionnaire, date_fin_questionnaire)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      intitule,
      org_formateur,
      nom_formateur,
      lieu,
      date_debut,
      date_fin,
      date_debut_questionnaire,
      date_fin_questionnaire,
    ],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      const formationID = results.insertId;
      res.status(201).json({ formationID });
    }
  );
});
app.get("/api/formation/:formationID", (req, res) => {
  const { formationID } = req.params;

  const query = `
    SELECT
      intitule,
      nom_formateur,
      org_formateur,
      lieu,
      date_debut,
      date_fin,
      date_debut_questionnaire,
      date_fin_questionnaire
    FROM formation
    WHERE formationID = ?
  `;

  db.query(query, [formationID], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Formation not found" });
    }

    res.status(200).json(results[0]);
  });
});

app.post("/api/participation", (req, res) => {
  const { formationID, utilisateurID } = req.body;

  const query = `
  INSERT INTO participation (formationID, utilisateurID)
  VALUES (?, ?)`;

  const values = [formationID, utilisateurID];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Erreur lors de l'ajout du participant:", error);
      return res.status(500).json({ error: "Erreur serveur interne" });
    }
    res.status(201).json({ message: "Participant ajouté avec succès" });
  });
});

app.post("/api/newUser", (req, res) => {
  const { formData, usersRoles } = req.body;
  const { password, nom, prenom, fonction, structureID, email, role_default } =
    formData;

  // Step 1: Convert role names to role IDs
  const roleNamesQuery =
    "SELECT roleID, nom_role FROM role WHERE nom_role IN (?)";
  db.query(roleNamesQuery, [usersRoles], (roleNamesErr, roleNamesResults) => {
    if (roleNamesErr) {
      console.error("Database query error:", roleNamesErr);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Create a mapping of role names to role IDs
    const roleNameToIdMap = {};
    roleNamesResults.forEach((row) => {
      roleNameToIdMap[row.nom_role] = row.roleID;
    });

    // Convert role names to role IDs
    const roleIds = usersRoles.map((roleName) => roleNameToIdMap[roleName]);

    // Get the last used username for custom generation
    const query =
      "SELECT MAX(username) AS last_username FROM utilisateur WHERE username LIKE 'local%'";
    db.query(query, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const lastUsername = result[0]?.last_username || "local00000";
      const lastNumber = parseInt(lastUsername.slice(5));
      const newNumber = lastNumber + 1;
      const newUsername = `local` + String(newNumber).padStart(5, "0");

      const insertQuery =
        "INSERT INTO utilisateur (username, password, nom, prenom, fonction, structureID, email, role_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        insertQuery,
        [
          newUsername,
          password,
          nom,
          prenom,
          fonction,
          structureID,
          email,
          role_default,
        ],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Database insert error:", insertErr);
            return res.status(500).json({ error: "Internal server error" });
          }

          const userID = insertResult.insertId;

          // Insert user roles into userrole table
          const userRolesQuery =
            "INSERT INTO userrole (utilisateurID, roleID) VALUES ?";
          const userRolesValues = roleIds.map((roleID) => [userID, roleID]);

          db.query(userRolesQuery, [userRolesValues], (rolesErr) => {
            if (rolesErr) {
              console.error("Database insert error:", rolesErr);
              return res.status(500).json({ error: "Internal server error" });
            }

            res.status(201).json({
              message: "User created successfully",
              userID: userID,
              username: newUsername,
            });
          });
        }
      );
    });
  });
});

app.get("/allUsers-structure", (req, res) => {
  const query = `
    SELECT utilisateur.*, structure.nom_structure
    FROM utilisateur
    LEFT JOIN structure ON utilisateur.structureID = structure.structureID
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

app.post("/api/Responses", (req, res) => {
  const {
    formationID,
    userID,
    selectedOptions,
    satisfactionRate,
    pointsForts,
    pointsAmeliorer,
    partiesInteressantes,
    recommandations,
    commentaires,
  } = req.body;

  if (!pointsForts || !pointsAmeliorer || !partiesInteressantes) {
    return res
      .status(400)
      .json({ error: "All required fields must be filled" });
  }

  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  const questions = [];

  for (let i = 0; i < 22; i++) {
    let key;
    if (i < 6) {
      key = `0-${i}`;
    } else if (i < 11) {
      key = `1-${i - 6}`;
    } else if (i < 16) {
      key = `2-${i - 11}`;
    } else if (i < 18) {
      key = `3-${i - 16}`;
    } else {
      key = `4-${i - 18}`;
    }
    const value = selectedOptions[key];
    questions.push(value !== undefined ? value : null);
  }

  const selectQuery = `
    SELECT * FROM Reponse
    WHERE formationID = ? AND utilisateurID = ?
  `;

  const insertQuery = `
    INSERT INTO Reponse (
      date_reponse,
      taux_satisfaction,
      formationID,
      utilisateurID,
      question1, question2, question3, question4, question5,
      question6, question7, question8, question9, question10,
      question11, question12, question13, question14, question15,
      question16, question17, question18, question19, question20,
      question21, question22,
      points_forts, points_ameliorer, parties_interessantes,
      recommandations, commentaires
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const updateQuery = `
    UPDATE Reponse
    SET date_reponse = ?, taux_satisfaction = ?, question1 = ?, question2 = ?, question3 = ?, question4 = ?, question5 = ?,
        question6 = ?, question7 = ?, question8 = ?, question9 = ?, question10 = ?, question11 = ?, question12 = ?, question13 = ?,
        question14 = ?, question15 = ?, question16 = ?, question17 = ?, question18 = ?, question19 = ?, question20 = ?, question21 = ?,
        question22 = ?, points_forts = ?, points_ameliorer = ?, parties_interessantes = ?, recommandations = ?, commentaires = ?
    WHERE formationID = ? AND utilisateurID = ?
  `;

  const values = [
    currentDate,
    satisfactionRate,
    ...questions,
    pointsForts,
    pointsAmeliorer,
    partiesInteressantes,
    recommandations || null,
    commentaires || null,
  ];

  db.query(selectQuery, [formationID, userID], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      // Update the existing response
      db.query(updateQuery, [...values, formationID, userID], (updateError) => {
        if (updateError) {
          console.error("Database update error:", updateError);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json({ message: "Responses updated successfully" });
      });
    } else {
      // Insert a new response
      db.query(
        insertQuery,
        [
          currentDate,
          satisfactionRate,
          formationID,
          userID,
          ...questions,
          pointsForts,
          pointsAmeliorer,
          partiesInteressantes,
          recommandations || null,
          commentaires || null,
        ],
        (insertError) => {
          if (insertError) {
            console.error("Database insert error:", insertError);
            return res.status(500).json({ error: "Internal server error" });
          }
          res.status(201).json({ message: "Responses saved successfully" });
        }
      );
    }
  });
});

// Check if a user has responded to a specific formation
app.get("/api/hasResponded/:formationID/:userID", (req, res) => {
  const { formationID, userID } = req.params;

  const query = `
    SELECT COUNT(*) as count
    FROM Reponse
    WHERE formationID = ? AND utilisateurID = ?
  `;

  db.query(query, [formationID, userID], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    const hasResponded = results[0].count > 0;
    res.status(200).json({ hasResponded });
  });
});

app.get("/api/evaluation/:formationID/:userID", (req, res) => {
  const { formationID, userID } = req.params;

  const query = `
    SELECT
      taux_satisfaction,
      question1, question2, question3, question4, question5,
      question6, question7, question8, question9, question10,
      question11, question12, question13, question14, question15,
      question16, question17, question18, question19, question20,
      question21, question22,
      points_forts, points_ameliorer, parties_interessantes,
      recommandations, commentaires
    FROM Reponse
    WHERE formationID = ? AND utilisateurID = ?
    ORDER BY date_reponse DESC
    LIMIT 1
  `;

  db.query(query, [formationID, userID], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No evaluation data found" });
    }

    res.status(200).json(results[0]);
  });
});

app.get("/api/user/:username", (req, res) => {
  const userName = req.params.username;

  db.query(
    "SELECT utilisateur.*, structure.nom_structure FROM utilisateur LEFT JOIN structure ON utilisateur.structureID = structure.structureID WHERE username = ?",
    [userName],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = results[0];
      return res.status(200).json(user);
    }
  );
});

// Get all roles for a specific user by userID
app.get("/api/user/:userID/roles", (req, res) => {
  const { userID } = req.params;

  const query = `
    SELECT role.nom_role
    FROM userrole
    JOIN role ON userrole.roleID = role.roleID
    WHERE userrole.utilisateurID = ?
  `;

  db.query(query, [userID], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

// Update user information based on username
app.put("/api/user/:username", (req, res) => {
  const { username } = req.params;
  const { password, nom, prenom, email, fonction, structureID } = req.body;

  const query = `
    UPDATE utilisateur
    SET password = ?, nom = ?, prenom = ?, email = ?, fonction = ?, structureID = ?
    WHERE username = ?
  `;

  db.query(
    query,
    [password, nom, prenom, email, fonction, structureID, username],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User information updated successfully" });
    }
  );
});

app.get("/api/users/details/:username?", (req, res) => {
  const username = req.params.username;

  // Construct the SQL query based on whether ID is provided or not
  let usersQuery;
  let queryParams;
  if (username) {
    usersQuery = `
    SELECT utilisateur.*, structure.nom_structure 
    FROM utilisateur 
    LEFT JOIN structure ON utilisateur.structureID = structure.structureID
    WHERE username = ?`;
    queryParams = [username];
  } else {
    usersQuery = `
    SELECT utilisateur.*, structure.nom_structure 
    FROM utilisateur 
    LEFT JOIN structure ON utilisateur.structureID = structure.structureID`;
    queryParams = [];
  }
  // Query to get all user details
  // const usersQuery = `
  //   SELECT utilisateur.*, structure.nom_structure
  //   FROM utilisateur
  //   LEFT JOIN structure ON utilisateur.structureID = structure.structureID`;

  // Query to get all roles
  const rolesQuery = `
    SELECT userrole.utilisateurID, role.nom_role 
    FROM userrole 
    JOIN role ON userrole.roleID = role.roleID`;

  // Execute the queries in parallel
  db.query(usersQuery, queryParams, (usersError, usersResults) => {
    if (usersError) {
      console.error("Database query error:", usersError);
      return res.status(500).json({ error: "Internal server error" });
    }

    db.query(rolesQuery, (rolesError, rolesResults) => {
      if (rolesError) {
        console.error("Database query error:", rolesError);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Create a map to associate user IDs with their roles
      const rolesMap = {};
      rolesResults.forEach((role) => {
        if (!rolesMap[role.utilisateurID]) {
          rolesMap[role.utilisateurID] = [];
        }
        rolesMap[role.utilisateurID].push(role.nom_role);
      });

      // Combine user details with their roles
      const usersWithRoles = usersResults.map((user) => {
        return {
          ...user,
          roles: rolesMap[user.utilisateurID] || [],
        };
      });

      return res.status(200).json(usersWithRoles);
    });
  });
});

app.post("/api/user/addRole", (req, res) => {
  const { userID, role } = req.body;

  // Convert role name to roleID
  const roleQuery = "SELECT roleID FROM role WHERE nom_role = ?";
  db.query(roleQuery, [role], (roleErr, roleResults) => {
    if (roleErr) {
      console.error("Database query error:", roleErr);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (roleResults.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    const roleID = roleResults[0].roleID;

    // Add the role to the user
    const query = "INSERT INTO userrole (utilisateurID, roleID) VALUES (?, ?)";
    db.query(query, [userID, roleID], (err) => {
      if (err) {
        console.error("Database insert error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Role added successfully" });
    });
  });
});

app.delete("/api/user/removeRole", (req, res) => {
  const { userID, role } = req.body;

  // Convert role name to roleID
  const roleQuery = "SELECT roleID FROM role WHERE nom_role = ?";
  db.query(roleQuery, [role], (roleErr, roleResults) => {
    if (roleErr) {
      console.error("Database query error:", roleErr);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (roleResults.length === 0) {
      return res.status(404).json({ error: "Role not found" });
    }

    const roleID = roleResults[0].roleID;

    // Remove the role from the user
    const query = "DELETE FROM userrole WHERE utilisateurID = ? AND roleID = ?";
    db.query(query, [userID, roleID], (err) => {
      if (err) {
        console.error("Database delete error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Role removed successfully" });
    });
  });
});

// Get formation information
app.get("/api/formations/:id?", (req, res) => {
  const formationID = req.params.id;

  // Construct the SQL query based on whether ID is provided or not
  let query;
  let queryParams;
  if (formationID) {
    query = "SELECT * FROM formation WHERE formationID = ?";
    queryParams = [formationID];
  } else {
    query = "SELECT * FROM formation";
    queryParams = [];
  }

  // Execute the SQL query
  db.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

app.get("/api/formations/:id/participations", (req, res) => {
  const formationID = req.params.id;

  const query = `
    SELECT utilisateur.*, structure.nom_structure
    FROM participation
    JOIN utilisateur ON participation.utilisateurID = utilisateur.utilisateurID
    LEFT JOIN structure ON utilisateur.structureID = structure.structureID
    WHERE participation.formationID = ?
  `;

  db.query(query, [formationID], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

app.put("/api/formation/:id", (req, res) => {
  const formationID = req.params.id;
  const {
    intitule,
    org_formateur,
    nom_formateur,
    lieu,
    date_debut,
    date_fin,
    date_debut_questionnaire,
    date_fin_questionnaire,
  } = req.body;

  const updateFormationQuery = `
    UPDATE formation
    SET intitule = ?, org_formateur = ?, nom_formateur = ?, lieu = ?, date_debut = ?, date_fin = ?, date_debut_questionnaire = ?, date_fin_questionnaire = ?
    WHERE formationID = ?`;

  db.query(
    updateFormationQuery,
    [
      intitule,
      org_formateur,
      nom_formateur,
      lieu,
      date_debut,
      date_fin,
      date_debut_questionnaire,
      date_fin_questionnaire,
      formationID,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating formation:", err);
        return res.status(500).json({ error: "Error updating formation" });
      }
      res.status(200).json({ message: "Formation updated successfully" });
    }
  );
});

// Update participations for a formation
app.put("/api/participations/:formationID", (req, res) => {
  const formationID = req.params.formationID;
  const { participations } = req.body;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("Transaction error:", err);
      return res.status(500).json({ error: "Transaction error" });
    }

    // Delete existing participations for the formation
    const deleteParticipationsQuery =
      "DELETE FROM participation WHERE formationID = ?";
    db.query(deleteParticipationsQuery, [formationID], (err, result) => {
      if (err) {
        return db.rollback(() => {
          console.error("Error deleting participations:", err);
          res.status(500).json({ error: "Error deleting participations" });
        });
      }

      // If no new participations are provided, commit the transaction and return
      if (!participations || participations.length === 0) {
        return db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Transaction commit error:", err);
              res.status(500).json({ error: "Transaction commit error" });
            });
          }
          res
            .status(200)
            .json({ message: "Participations updated successfully" });
        });
      }

      // Insert new participations
      const insertParticipationQuery =
        "INSERT INTO participation (formationID, utilisateurID) VALUES ?";
      const participationValues = participations.map((part) => [
        formationID,
        part.utilisateurID,
      ]);

      db.query(
        insertParticipationQuery,
        [participationValues],
        (err, result) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error inserting participations:", err);
              res.status(500).json({ error: "Error inserting participations" });
            });
          }

          // Commit transaction
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Transaction commit error:", err);
                res.status(500).json({ error: "Transaction commit error" });
              });
            }
            res
              .status(200)
              .json({ message: "Participations updated successfully" });
          });
        }
      );
    });
  });
});

app.get("/api/reponses/:formationID?/:responseID?", (req, res) => {
  const { formationID, responseID } = req.params;
  let query = `
    SELECT
      r.reponseID,
      r.date_reponse,
      r.taux_satisfaction,
      r.question1,
      r.question2,
      r.question3,
      r.question4,
      r.question5,
      r.question6,
      r.question7,
      r.question8,
      r.question9,
      r.question10,
      r.question11,
      r.question12,
      r.question13,
      r.question14,
      r.question15,
      r.question16,
      r.question17,
      r.question18,
      r.question19,
      r.question20,
      r.question21,
      r.question22,
      r.points_forts, 
      r.points_ameliorer, 
      r.parties_interessantes,
      r.recommandations, 
      r.commentaires,
      f.formationID,
      u.utilisateurID,
      u.nom,
      u.prenom,
      u.fonction,
      s.nom_structure
    FROM
      reponse r
    JOIN
      formation f ON r.formationID = f.formationID
    JOIN
      utilisateur u ON r.utilisateurID = u.utilisateurID
    JOIN
      structure s ON u.structureID = s.structureID
  `;

  const conditions = [];
  const params = [];

  if (formationID) {
    conditions.push("r.formationID = ?");
    params.push(formationID);
  }

  if (responseID) {
    conditions.push("r.reponseID = ?");
    params.push(responseID);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/userReponses/:reponseID?", (req, res) => {
  const { reponseID } = req.params;
  let query = `SELECT * FROM reponse`;

  if (reponseID) {
    query += ` WHERE reponseID = ?`;
  }

  db.query(query, reponseID ? [reponseID] : [], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/adminFormationStatistics", (req, res) => {
  const query = `
    SELECT 
      f.formationID,
      f.intitule AS title,
      COUNT(DISTINCT p.participationID) AS participants,
      COUNT(DISTINCT r.reponseID) AS reponses,
      AVG(r.taux_satisfaction) AS tauxSatis
    FROM 
      formation f
    LEFT JOIN 
      participation p ON f.formationID = p.formationID
    LEFT JOIN 
      reponse r ON f.formationID = r.formationID
    GROUP BY 
      f.formationID, f.intitule;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/parametres", (req, res) => {
  const query = "SELECT * FROM parametres_de_base";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      const parameters = {};
      results.forEach((row) => {
        parameters[row.param_key] = row.param_value;
      });
      res.json(parameters);
    }
  });
});

app.put("/api/parametres", (req, res) => {
  const parameters = req.body;

  const queries = Object.keys(parameters).map((key) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO parametres_de_base (param_key, param_value)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE param_value = VALUES(param_value)
      `;
      const values = [key, parameters[key]];

      db.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });

  Promise.all(queries)
    .then(() => {
      res.json({ message: "Parameters updated successfully" });
    })
    .catch((err) => {
      console.error("Error updating data:", err);
      res.status(500).json({ error: "Failed to update data" });
    });
});

app.put("/api/utilisateur/:utilisateurID/role_default", (req, res) => {
  const { utilisateurID } = req.params;
  const { role_default } = req.body;

  const query = `
    UPDATE utilisateur
    SET role_default = ?
    WHERE utilisateurID = ?
  `;

  db.query(query, [role_default, utilisateurID], (err, results) => {
    if (err) {
      console.error("Error updating role_default:", err);
      res.status(500).json({ error: "Failed to update role_default" });
    } else {
      res.json({ message: "role_default updated successfully" });
    }
  });
});

//sending notifications emails
app.post("/api/send-notification", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await sendEmail(to, subject, message);
    res.status(200).send("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Failed to send notification");
  }
});

app.get("/api/admin-email", (req, res) => {
  const query =
    'SELECT param_value FROM parametres_de_base WHERE param_key = "email_admin"';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Failed to fetch admin email" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Admin email not found" });
    }
    const adminEmail = results[0].param_value;
    res.json({ email: adminEmail });
  });
});

// Function to fetch all LDAP users
function fetchAllLdapUsers(callback) {
  fetchLdapConfig((err, config) => {
    if (err) {
      console.error("Error fetching LDAP config:", err);
      return callback(err, null);
    }

    const client = ldap.createClient({
      // url: `ldap://${config.ServeurLDAP}:389`,
      url: `ldap://${config.ServeurLDAP}:${config.LDAP_port}`,
    });

    client.bind(config.DN_cmpt, config.LDAP_password, (err) => {
      if (err) {
        console.error("LDAP admin bind error:", err);
        return callback(err);
      }

      const opts = {
        filter: "(objectClass=inetOrgPerson)",
        scope: "sub",
        attributes: ["uid", "cn", "sn", "givenName", "title", "mail"],
      };

      client.search(`ou=users,${config.baseDN}`, opts, (err, res) => {
        if (err) {
          console.error("LDAP search error:", err);
          client.unbind();
          return callback(err);
        }

        const users = [];
        res.on("searchEntry", (entry) => {
          users.push(
            transformSearchResultEntry(JSON.parse(JSON.stringify(entry.pojo)))
          );
        });

        res.on("error", (err) => {
          console.error("LDAP search error event:", err.message);
          client.unbind();
          return callback(err);
        });

        res.on("end", (result) => {
          client.unbind();
          callback(null, users);
        });
      });
    });

    client.on("error", (err) => {
      console.error("LDAP client error:", err);
      client.unbind();
      return callback(err, null);
    });
  });
}

function transformSearchResultEntry(entry) {
  const result = {};

  entry.attributes.forEach((attr) => {
    result[attr.type] = attr.values[0];
  });

  return result;
}

// Function to sync LDAP data with MySQL
function syncLdapToMySql(callback) {
  fetchAllLdapUsers((err, ldapUsers) => {
    if (err) {
      return callback(err);
    }

    // Iterate through LDAP users and update MySQL database
    ldapUsers.forEach((ldapUser) => {
      const { uid, cn, sn, givenName, title, mail } = ldapUser;

      // Check if the user exists in the MySQL database
      db.query(
        "SELECT * FROM utilisateur WHERE username = ?",
        [uid],
        (error, results) => {
          if (error) {
            console.error("Database query error:", error);
            return callback(error);
          }

          // if (results.length === 0) {
          //
          //   // If the user does not exist, insert them into the database
          //
          //   db.query(
          //     "INSERT INTO utilisateur (username, nom, prenom, fonction, email, role_default) VALUES (?, ?, ?, ?, ?, ?)",
          //     [uid, sn, givenName, title, mail, "Participant"],
          //     (insertError, insertResults) => {
          //       if (insertError) {
          //         console.error("Database insert error:", insertError);
          //         return callback(insertError);
          //       }
          //     }
          //   );
          // } else {
          if (results.length !== 0) {
            // If the user already exists, update their information
            db.query(
              "UPDATE utilisateur SET nom = ?, prenom = ?, fonction = ?, email = ? WHERE username = ?",
              [sn, givenName, title, mail, uid],
              (updateError) => {
                if (updateError) {
                  console.error("Database update error:", updateError);
                  return callback(updateError);
                }
              }
            );
          }
        }
      );
    });

    callback(null, "Synchronisation terminée avec succès");
  });
}

// Endpoint to trigger synchronization
app.post("/api/sync-ldap", (req, res) => {
  syncLdapToMySql((err, message) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message });
  });
});

// Function to fetch the sync interval from the database
const fetchSyncInterval = (callback) => {
  db.query(
    'SELECT param_value FROM parametres_de_base WHERE param_key = "periode_synch"',
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return callback(err);
      }

      if (results.length === 0) {
        const error = new Error("Sync interval not found");
        console.error(error);
        return callback(error);
      }

      const intervalDays = parseInt(results[0].param_value, 10);
      callback(null, intervalDays);
    }
  );
};

// Function to schedule the sync task
let currentTask = null;

const scheduleSyncTask = () => {
  if (currentTask) {
    currentTask.stop(); // Stop the previous task if it exists
  }

  fetchSyncInterval((err, intervalDays) => {
    if (err) {
      console.error("Failed to fetch sync interval:", err);
      return;
    }

    if (intervalDays > 0) {
      const intervalSeconds = intervalDays * 24 * 60 * 60;
      // const intervalSeconds = 10;

      currentTask = cron.schedule(
        `*/${intervalSeconds} * * * * *`,
        syncLdapToMySqlWrapper
      );

      console.log(`Scheduled sync task to run every ${intervalDays} days.`);
    } else {
      console.log("Sync task is disabled");
    }
  });
};
const syncLdapToMySqlWrapper = () => {
  syncLdapToMySql(handleSyncCompletion);
};

const handleSyncCompletion = (err, message) => {
  if (err) {
    console.error("Error during synchronization:", err);
  } else {
    console.log(message);
  }
};

// Initialize the schedule
scheduleSyncTask();

// Endpoint for admin to update sync interval
app.post("/api/update-sync-interval", (req, res) => {
  const { syncIntervalDays } = req.body;

  db.query(
    'UPDATE parametres_de_base SET param_value = ? WHERE param_key = "periode_synch"',
    [syncIntervalDays],
    (err) => {
      if (err) {
        console.error("Failed to update sync interval:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      scheduleSyncTask(); // Re-schedule the task with the new interval

      res.status(200).json({ message: "Sync interval updated successfully" });
    }
  );
});

// API routes (keep your existing API routes here)
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(8000, "0.0.0.0", () => {
  console.log("listening");
});
