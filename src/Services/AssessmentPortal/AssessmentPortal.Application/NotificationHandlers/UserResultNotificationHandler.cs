using AssessmentPortal.Application.Notifications;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AssessmentPortal.Application.Notification_Handlers
{
    public class UserResultNotificationHandler : INotificationHandler<UserResultCreatedNotification>
    {
        #region Constructor
        private readonly IUserResultRepository _userResultRepository;
        private readonly IMapper _mapper;
        public UserResultNotificationHandler(IUserResultRepository userResultRepository, IMapper mapper)
        {
            _userResultRepository = userResultRepository;
            _mapper = mapper;
        }
        #endregion
        public async Task Handle(UserResultCreatedNotification notification, CancellationToken cancellationToken)
        {
            var userResult = _mapper.Map<UserResult>(notification);
            await _userResultRepository.AddReadUserResultAsync(userResult);
        }
    }
}
