using AssessmentPortal.Application.Exceptions;
using AssessmentPortal.Application.Features.Commands;
using AssessmentPortal.Application.Notifications;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AssessmentPortal.Application.Features.Handlers
{
    public class CreateUserResultCommandHandler : IRequestHandler<CreateUserResultCommand, string>
    {
        #region Constructor
        private readonly IUserResultRepository _userResultRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public CreateUserResultCommandHandler(IUserResultRepository userResultRepository, IMapper mapper, IMediator mediator)
        {
            _userResultRepository = userResultRepository;
            _mapper = mapper;
            _mediator = mediator;
        }
        #endregion
        #region Create new User Result
        public async Task<string> Handle(CreateUserResultCommand request, CancellationToken cancellationToken)
        {
            var userResult = _mapper.Map<UserResult>(request);
            var result = await _userResultRepository.AddWriteUserResultAsync(userResult);
            if (result == string.Empty)
            {
                throw new CustomException("Invalid");
            }
            var userResultCreatedNotification = _mapper.Map<UserResultCreatedNotification>(userResult);
            await _mediator.Publish(userResultCreatedNotification, cancellationToken);
            return result;
        }
        #endregion
    }
}
