// THIS IS YOUR CONFIGURATION FILE
// IT IS USED BY ALL THE OTHERS SCRIPTS TO GET YOUR
// CONNECTION DETAILS. YOU ONLY NEED TO EDIT THE BIT
// BETWEEN THE DOTTED LINES BELOW.

// declare a JSON data structure to hold our configuration details
let config = {}
// lets add an element just for SQL connection details
config.sql = {}
// You have to put your own details in the code below
// PORT: this varies depending on WHERE youre database is, local or remote (doc.gold.ac.uk)
// you can either edit these values of use the alternative file config_local.js
config.sql.port = 3307
// if it[s local (MAMP/WAMP) this should be 'localhost'
config.sql.host = "doc.gold.ac.uk"

// NOTE IN THE FOLLOWING SECTION YOU HAVE TO REPLACE ALL
// THE <> THINGS WITH YOUR OWN VALUES 
// ie <your id> becomes abcd001 or whatever your ID is
// --------------------------------------------
// your ID for doc.gold.ac.uk OR 'root' for MAMP/WAMP
config.sql.user = "gserr001"
// your DATABASE password OR '' for MAMP/WAMP (i.e. empty, no password, nada, unless you changed it!)
config.sql.password = "ilKimchi1788!"
// the name of the DATABASE, you get this from PHPMyAdmin, see the exercise notes
config.sql.database = "gserr001_tarotbase"
// ---------------------------------------------
 
// let the rest of the code see this data
module.exports = config;
