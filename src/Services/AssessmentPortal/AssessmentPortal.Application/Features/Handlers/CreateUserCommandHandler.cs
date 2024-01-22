using AssessmentPortal.Application.Exceptions;
using AssessmentPortal.Application.Features.Commands;
using AssessmentPortal.Application.Notifications;
using AssessmentPortal.Domain.CoreModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AssessmentPortal.Application.Features.Handlers
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, string>
    {
        #region Constructor
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public CreateUserCommandHandler(IUserRepository userRepository, IMapper mapper, IMediator mediator)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _mediator = mediator;
        }
        #endregion
        #region Create new User
        public async Task<string> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var userDetail = _mapper.Map<User>(request);
            var user = await _userRepository.AddWriteUserAsync(userDetail);
            if (user == string.Empty)
            {
                throw new CustomException("Exist");
            }
            var userCreatedNotification = _mapper.Map<UserCreatedNotification>(userDetail);
            await _mediator.Publish(userCreatedNotification, cancellationToken);
            return user;
        }
        #endregion
    }
}
