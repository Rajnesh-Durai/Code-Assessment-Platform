using AssessmentPortal.Application.Exceptions;
using AssessmentPortal.Application.Features.Commands;
using AssessmentPortal.Application.Notifications;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AssessmentPortal.Application.Features.Handlers
{
    public class CreateUserAssessmentCommandHandler : IRequestHandler<CreateUserAssessmentCommand, string>
    {
        #region Constructor
        private readonly IUserAssessmentRepository _userAssessmentRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public CreateUserAssessmentCommandHandler(IUserAssessmentRepository userAssessmentRepository, IMapper mapper, IMediator mediator)
        {
            _userAssessmentRepository = userAssessmentRepository;
            _mapper = mapper;
            _mediator = mediator;
        }
        #endregion
        #region Create new User Assessment
        public async Task<string> Handle(CreateUserAssessmentCommand request, CancellationToken cancellationToken)
        {
            var userAssessmentDetail = _mapper.Map<UserAssessment>(request);
            var userAssessment = await _userAssessmentRepository.AddWriteAssessmentAsync(userAssessmentDetail);
            if (userAssessment == string.Empty)
            {
                throw new CustomException("Invalid");
            }
            var userAssessmentCreatedNotification = _mapper.Map<UserAssessmentCreatedNotification>(userAssessmentDetail);
            await _mediator.Publish(userAssessmentCreatedNotification, cancellationToken);
            return userAssessment;
        }
        #endregion
    }
}
