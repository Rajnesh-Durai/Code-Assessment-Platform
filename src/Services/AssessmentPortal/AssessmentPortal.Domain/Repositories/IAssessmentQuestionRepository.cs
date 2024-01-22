using AssessmentPortal.Domain.DTOs;

namespace AssessmentPortal.Domain.Repositories
{
    public interface IAssessmentQuestionRepository
    {
        Task<IEnumerable<GetAssessmentQuestionDTO>> GetAssessmentQuestionByIdAsync(Guid userAssessmentId);
    }
}
