using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.Repositories;
using AssessmentPortal.Infrastructure.Data;
using Dapper;
using System.Data;

namespace AssessmentPortal.Infrastructure.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        #region Constructor

        private readonly SkillAssessmentDbContext _context;

        public QuestionRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }

        #endregion

        #region Constants

        private const string addWriteSchemaStoredProcedure = "SkillAssessmentWrite.CreateQuestion";
        private const string addReadSchemaStoredProcedure = "SkillAssessmentRead.CreateQuestion";

        #endregion

        #region Repository layer for adding the user Assessment

        /// <summary>
        /// Executes a stored procedure and returns the result as an integer.
        /// </summary>
        private async Task<int> ExecuteStoredProcedureAsync(string storedProcedure, DynamicParameters parameters)
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.ExecuteScalarAsync<int>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
            }
        }

        #region Add Question with specified stored procedure

        /// <summary>
        /// Adds a question using the specified stored procedure.
        /// </summary>
        private async Task<string> AddQuestionAsync(Question question, string storedProcedure)
        {
            string response = string.Empty;

            var parameters = new DynamicParameters();
            parameters.Add("skill_id", question.Skill_id);
            parameters.Add("topic_id", question.Topic_id);
            parameters.Add("question", question.question);
            parameters.Add("sample_input", question.Sample_input);
            parameters.Add("sample_output", question.Sample_output);
            parameters.Add("expected_input", question.Expected_input);
            parameters.Add("expected_output", question.Expected_output);

            int result = await ExecuteStoredProcedureAsync(storedProcedure, parameters);

            if (result == 1)
            {
                response = "Question Created";
            }

            return response;
        }

        #endregion

        #region Add question in Write Schema

        /// <summary>
        /// Adds a question using the write stored procedure.
        /// </summary>
        public async Task<string> AddWriteQuestionAsync(Question question)
        {
            return await AddQuestionAsync(question, addWriteSchemaStoredProcedure);
        }

        #endregion

        #region Add question in Read Schema

        /// <summary>
        /// Adds a question using the read stored procedure.
        /// </summary>
        public async Task<string> AddReadQuestionAsync(Question question)
        {
            return await AddQuestionAsync(question, addReadSchemaStoredProcedure);
        }

        #endregion

        #endregion
    }
}
