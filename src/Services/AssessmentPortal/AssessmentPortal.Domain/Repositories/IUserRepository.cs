using AssessmentPortal.Domain.CoreModels;

namespace AssessmentPortal.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<string> AddWriteUserAsync(User user);
        Task<string> AddReadUserAsync(User user);
        Task<User> GetUserByIdAsync(Guid id);
    }
}
