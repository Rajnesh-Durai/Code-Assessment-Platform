using AssessmentPortal.Application.Notifications;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AssessmentPortal.Application.Notification_Handlers
{
    public class UserAssessmentCreatedNotificationHandler : INotificationHandler<UserAssessmentCreatedNotification>
    {
        private readonly IUserAssessmentRepository _userAssessmentRepository;
        private readonly IMapper _mapper;

        public UserAssessmentCreatedNotificationHandler(IUserAssessmentRepository userAssessmentRepository, IMapper mapper)
        {
            _userAssessmentRepository = userAssessmentRepository;
            _mapper = mapper;
        }
        public async Task Handle(UserAssessmentCreatedNotification notification, CancellationToken cancellationToken)
        {
            var newUserAssessmentDetails = _mapper.Map<UserAssessment>(notification);
            await _userAssessmentRepository.AddReadAssessmentAsync(newUserAssessmentDetails);
        }
    }
}
