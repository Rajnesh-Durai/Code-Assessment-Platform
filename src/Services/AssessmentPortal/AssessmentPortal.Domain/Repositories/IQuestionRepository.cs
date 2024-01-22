using AssessmentPortal.Domain.CoreModels;

namespace AssessmentPortal.Domain.Repositories
{
    public interface IQuestionRepository
    {
        Task<string> AddWriteQuestionAsync(Question question);
        Task<string> AddReadQuestionAsync(Question question);
    }
}
