using AssessmentPortal.Application.Exceptions;
using AssessmentPortal.Domain.DTOs;
using AssessmentPortal.Domain.Repositories;
using AssessmentPortal.Infrastructure.Data;
using Dapper;
using System.Data;

namespace AssessmentPortal.Infrastructure.Repositories
{
    public class AssessmentQuestionRepository : IAssessmentQuestionRepository
    {
        #region Constructor

        private readonly SkillAssessmentDbContext _context;
        private const string GetAssessmentQuestionByIdStoredProcedure = "SkillAssessmentRead.GetUserAssessmentQuestions";

        public AssessmentQuestionRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }

        #endregion

        #region Execute Stored Procedure

        /// <summary>
        /// Executes a stored procedure and returns the result as a collection of GetAssessmentQuestionDTO.
        /// Throws CustomException with error code "NoId" if the result is null.
        /// </summary>
        private async Task<IEnumerable<GetAssessmentQuestionDTO>> ExecuteStoredProcedureAsync(string storedProcedure, DynamicParameters parameters)
        {
            using (var connection = _context.CreateConnection())
            {
                var result = await connection.QueryAsync<GetAssessmentQuestionDTO>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
                if (result.Count() == 0)
                {
                    throw new CustomException("NoId");
                }
                return result;
            }
        }

        #endregion

        #region Get Assessment Question by ID

        /// <summary>
        /// Retrieves assessment questions by user assessment ID using the GetAssessmentQuestionById stored procedure.
        /// </summary>
        public async Task<IEnumerable<GetAssessmentQuestionDTO>> GetAssessmentQuestionByIdAsync(Guid userAssessmentId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("user_assessment_id", userAssessmentId);

            return await ExecuteStoredProcedureAsync(GetAssessmentQuestionByIdStoredProcedure, parameters);
        }

        #endregion
    }
}
