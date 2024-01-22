using AssessmentPortal.Application.Exceptions;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.DTOs;
using AssessmentPortal.Domain.Repositories;
using AssessmentPortal.Infrastructure.Data;
using Dapper;
using System.Data;

namespace AssessmentPortal.Infrastructure.Repositories
{
    public class UserAssessmentRepository : IUserAssessmentRepository
    {
        #region Constructor

        private readonly SkillAssessmentDbContext _context;

        public UserAssessmentRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }

        #endregion

        #region Constants

        private const string addWriteSchemaStoredProcedure = "SkillAssessmentWrite.CreateUserAssessment";
        private const string addReadSchemaStoredProcedure = "SkillAssessmentRead.CreateUserAssessment";
        private const string GetUserAssessmentByIdStoredProcedure = "SkillAssessmentRead.GetUserAssessmentDetails";

        #endregion

        #region Repository layer for adding a user assessment

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

        #region Add User Assessment with specified stored procedure

        /// <summary>
        /// Adds a user assessment using the specified stored procedure.
        /// </summary>
        private async Task<string> AddUserAssessmentAsync(UserAssessment userAssessment, string storedProcedure)
        {
            string response = string.Empty;

            var parameters = new DynamicParameters();
            parameters.Add("id", userAssessment.Id);
            parameters.Add("user_id", userAssessment.User_id);
            parameters.Add("skill_id", userAssessment.Skill_id);
            parameters.Add("topic_id", userAssessment.Topic_id);
            parameters.Add("number_of_questions", userAssessment.Number_of_questions);
            parameters.Add("total_time", userAssessment.Total_time);

            int result = await ExecuteScalarStoredProcedureAsync(storedProcedure, parameters);

            if (result == 1)
            {
                response = "User Assessment Created";
            }

            return response;
        }

        #endregion

        #region Add user assessment in Write Schema

        /// <summary>
        /// Adds a user assessment using the write stored procedure.
        /// </summary>
        public async Task<string> AddWriteAssessmentAsync(UserAssessment userAssessment)
        {
            return await AddUserAssessmentAsync(userAssessment, addWriteSchemaStoredProcedure);
        }

        #endregion

        #region Add user assessment in Read Schema

        /// <summary>
        /// Adds a user assessment using the read stored procedure.
        /// </summary>
        public async Task<string> AddReadAssessmentAsync(UserAssessment userAssessment)
        {
            return await AddUserAssessmentAsync(userAssessment, addReadSchemaStoredProcedure);
        }

        #endregion

        #endregion

        #region Repository layer for get user assessment by id
        /// <summary>
        /// Executes a stored procedure and returns the result as a list of GetUserAssessmentDetailsDTO objects.
        /// Throws CustomException with error code "NoId" if the result is null.
        /// </summary>
        private async Task<IEnumerable<GetUserAssessmentDetailsDTO>> ExecuteStoredProcedureAsync(string storedProcedure, DynamicParameters parameters)
        {
            using (var connection = _context.CreateConnection())
            {
                var result = await connection.QueryAsync<GetUserAssessmentDetailsDTO>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
                if (result.Count() == 0)
                {
                    throw new CustomException("NoId");
                }
                return result;
            }
        }

        #region Get user assessment by ID

        /// <summary>
        /// Retrieves user assessment details by user ID using the GetUserAssessmentById stored procedure.
        /// </summary>
        public async Task<IEnumerable<GetUserAssessmentDetailsDTO>> GetUserAssessmentByIdAsync(Guid userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("user_id", userId);

            return await ExecuteStoredProcedureAsync(GetUserAssessmentByIdStoredProcedure, parameters);
        }

        #endregion       

        #endregion
    }
}
