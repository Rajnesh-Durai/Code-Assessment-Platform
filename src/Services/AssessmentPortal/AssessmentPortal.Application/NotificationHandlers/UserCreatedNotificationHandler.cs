using AssessmentPortal.Application.Notifications;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AssessmentPortal.Application.Notification_Handlers
{
    public class UserCreatedNotificationHandler : INotificationHandler<UserCreatedNotification>
    {
        #region Constructor
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserCreatedNotificationHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        #endregion
        public async Task Handle(UserCreatedNotification notification, CancellationToken cancellationToken)
        {
            var user = _mapper.Map<User>(notification);
            await _userRepository.AddReadUserAsync(user);
        }
    }
}
