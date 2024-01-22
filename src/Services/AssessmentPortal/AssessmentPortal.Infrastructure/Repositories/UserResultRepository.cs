using AssessmentPortal.Application.Exceptions;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.DTOs;
using AssessmentPortal.Domain.Repositories;
using AssessmentPortal.Infrastructure.Data;
using Dapper;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Data;
using System.Data.Common;

namespace AssessmentPortal.Infrastructure.Repositories
{
    public class UserResultRepository : IUserResultRepository
    {
        #region Constructor

        private readonly SkillAssessmentDbContext _context;

        public UserResultRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }

        #endregion

        #region Constants

        private const string addWriteSchemaStoredProcedure = "SkillAssessmentWrite.CreateUserResult";
        private const string addReadSchemaStoredProcedure = "SkillAssessmentRead.CreateUserResult";
        private const string GetUserResultByIdStoredProcedure = "SkillAssessmentRead.GetUserResultById";
        private const string GetLastUserResultByIdStoredProcedure = "SkillAssessmentRead.GetLastUserResultById";
        private const string GetComparedUserResultByIdStoredProcedure = "SkillAssessmentRead.GetComparedUserResultById";

        #endregion

        #region Execute Stored procedure and return list for get operation

        /// <summary>
        /// Executes a stored procedure and returns the result as a list of UserResult objects.
        /// Throws CustomException with error code "NoId" if the result is null.
        /// </summary>
        private async Task<IEnumerable<UserResultDTO>> ExecuteStoredProcedureAsync(string storedProcedure, DynamicParameters parameters)
        {
            using (var connection = _context.CreateConnection())
            {
                var result = await connection.QueryAsync<UserResultDTO>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
                if (result == null || result.Count() == 0)
                {
                    throw new CustomException("NoId");
                }
                return result;
            }
        }

        #endregion

        #region Execute Stored procedure and return scalar for post operation

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

        #endregion

        #region Add User result in specified stored procedure

        /// <summary>
        /// Adds a user result using the specified stored procedure.
        /// </summary>
        private async Task<string> AddUserResultAsync(UserResult userResult, string storedProcedure)
        {
            string response = string.Empty;

            var parameters = new DynamicParameters();
            parameters.Add("user_id", userResult.User_id);
            parameters.Add("user_assessment_id", userResult.User_assessment_id);
            parameters.Add("score", userResult.Score);
            parameters.Add("correct_answer", userResult.Correct_answer);
            parameters.Add("wrong_answer", userResult.Wrong_answer);

            int result = await ExecuteScalarStoredProcedureAsync(storedProcedure, parameters);

            if (result == 1)
            {
                response = "User result Added";
            }

            return response;
        }

        #endregion

        #region Add User result in write schema

        /// <summary>
        /// Adds a user result using the write stored procedure.
        /// </summary>
        public async Task<string> AddWriteUserResultAsync(UserResult userResult)
        {
            return await AddUserResultAsync(userResult, addWriteSchemaStoredProcedure);
        }

        #endregion

        #region Add user result in read schema

        /// <summary>
        /// Adds a user result using the read stored procedure.
        /// </summary>
        public async Task<string> AddReadUserResultAsync(UserResult userResult)
        {
            return await AddUserResultAsync(userResult, addReadSchemaStoredProcedure);
        }

        #endregion

        #region Get user result by id

        /// <summary>
        /// Retrieves user result details by user ID using the GetUserResultById stored procedure.
        /// </summary>
        public async Task<IEnumerable<UserResultDTO>> GetUserResultByIdAsync(Guid userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("user_id", userId);

            return await ExecuteStoredProcedureAsync(GetUserResultByIdStoredProcedure, parameters);
        }

        #endregion

        #region Get Last updated user result by id

        /// <summary>
        /// Retrieves user result details by user ID using the GetUserResultById stored procedure.
        /// </summary>
        public async Task<IEnumerable<UserResultDTO>> GetLastUserResultByIdAsync(Guid userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("user_id", userId);

            return await ExecuteStoredProcedureAsync(GetLastUserResultByIdStoredProcedure, parameters);
        }

        #endregion

        #region Get compared user result by id

        /// <summary>
        /// Retrieves user result details by user ID using the GetUserResultById stored procedure.
        /// </summary>
        public async Task<IEnumerable<UserResultDTO>> GetComparedUserResultByIdAsync(Guid userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("user_id", userId);
            return await ExecuteStoredProcedureAsync(GetComparedUserResultByIdStoredProcedure, parameters);
        }

        #endregion

        #region Get All User result
        public async Task<List<UserResult>> GetAllAsync()
        {
            using var connection = _context.CreateConnection();
            var userResults = await connection.QueryAsync<UserResult>("SELECT * FROM SkillAssessmentRead.UserResults");
            return userResults.AsList();
        }
        #endregion
    }
}
