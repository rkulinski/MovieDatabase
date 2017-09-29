var configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return `mongodb://${configValues.uname}:${configValues.pwd}@ds151554.mlab.com:51554/movie_database`;
    }
    
}