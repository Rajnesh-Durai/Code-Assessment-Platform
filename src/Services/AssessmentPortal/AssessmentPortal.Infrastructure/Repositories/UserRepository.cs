using AssessmentPortal.Application.Exceptions;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.Repositories;
using AssessmentPortal.Infrastructure.Data;
using Dapper;
using System.Data;

namespace AssessmentPortal.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        #region Constructor
        private readonly SkillAssessmentDbContext _context;
        public UserRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region Constants

        private const string addWriteSchemaStoredProcedure = "SkillAssessmentWrite.CreateUser";
        private const string addReadSchemaStoredProcedure = "SkillAssessmentWrite.CreateUser";
        private const string GetUserByIdStoredProcedure = "SkillAssessmentRead.GetUserById";

        #endregion
        #region Repository layer for adding a user

        /// <summary>
        /// Executes a stored procedure and returns the result as an integer.
        /// </summary>
        private async Task<int> ExecuteScalarStoredProcedureAsync(string storedProcedure, DynamicParameters parameters)
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.ExecuteScalarAsync<int>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
            }
        }
        #region Add User with specified stored procedure

        /// <summary>
        /// Adds a user using the specified stored procedure.
        /// </summary>
        private async Task<string> AddUserAsync(User user, string storedProcedure)
        {
            string response = string.Empty;

            var parameters = new DynamicParameters();
            parameters.Add("id", user.Id);
            parameters.Add("first_name", user.First_name);
            parameters.Add("last_name", user.Last_name);
            parameters.Add("email", user.Email);
            parameters.Add("role_id", user.Role_id);

            int result = await ExecuteScalarStoredProcedureAsync(storedProcedure, parameters);

            if (result == 1)
            {
                response = "User Added";
            }

            return response;
        }

        #endregion
        #region Add user in Write Schema

        /// <summary>
        /// Adds a user using the write stored procedure.
        /// </summary>
        public async Task<string> AddWriteUserAsync(User user)
        {
            return await AddUserAsync(user, addWriteSchemaStoredProcedure);
        }

        #endregion
        #region Add user in Read Schema

        /// <summary>
        /// Adds a user using the read stored procedure.
        /// </summary>
        public async Task<string> AddReadUserAsync(User user)
        {
            return await AddUserAsync(user, addReadSchemaStoredProcedure);
        }

        #endregion
        #endregion
        #region Repository layer for get an user by id
        /// <summary>
        /// Executes a stored procedure and returns the result as a User object.
        /// Throws CustomException with error code "NoId" if the result is null.
        /// </summary>
        private async Task<User> ExecuteStoredProcedureAsync(string storedProcedure, DynamicParameters parameters)
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<User>(storedProcedure, parameters, commandType: CommandType.StoredProcedure)
                    ?? throw new CustomException("NoId");
            }
        }
        #region Get user by ID

        /// <summary>
        /// Retrieves a user by ID using the GetUserById stored procedure.
        /// </summary>
        public async Task<User> GetUserByIdAsync(Guid id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("id", id);

            return await ExecuteStoredProcedureAsync(GetUserByIdStoredProcedure, parameters);
        }

        #endregion


        #endregion
    }
}
