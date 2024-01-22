using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.DTOs;

namespace AssessmentPortal.Domain.Repositories
{
    public interface IUserAssessmentRepository
    {
        Task<string> AddReadAssessmentAsync(UserAssessment userAssessment);
        Task<string> AddWriteAssessmentAsync(UserAssessment userAssessment);
        Task<IEnumerable<GetUserAssessmentDetailsDTO>> GetUserAssessmentByIdAsync(Guid userId);
    }
}
