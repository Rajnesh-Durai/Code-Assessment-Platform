using AssessmentPortal.Application.Notifications;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AssessmentPortal.Application.NotificationHandlers
{
    public class QuestionCreatedNotificationHandler : INotificationHandler<QuestionCreatedNotification>
    {
        #region Constructor
        private readonly IQuestionRepository _questionRepository;
        private readonly IMapper _mapper;
        public QuestionCreatedNotificationHandler(IQuestionRepository questionRepository, IMapper mapper)
        {
            _questionRepository = questionRepository;
            _mapper = mapper;
        }
        #endregion
        public async Task Handle(QuestionCreatedNotification notification, CancellationToken cancellationToken)
        {
            var question = _mapper.Map<Question>(notification);
            await _questionRepository.AddReadQuestionAsync(question);
        }
    }
}
