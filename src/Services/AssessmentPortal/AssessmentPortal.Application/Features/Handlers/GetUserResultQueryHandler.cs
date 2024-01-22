using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Application.ViewModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AssessmentPortal.Application.Features.Handlers
{
    public class GetUserResultQueryHandler : IRequestHandler<GetUserResultQuery, List<UserResultResponse>>
    {
        #region Constructor
        private readonly IUserResultRepository _userResultRepository;
        private readonly IMapper _mapper;
        public GetUserResultQueryHandler(IUserResultRepository userResultRepository, IMapper mapper)
        {
            _userResultRepository = userResultRepository;
            _mapper = mapper;
        }
        #endregion
        #region Get User result by id
        public async Task<List<UserResultResponse>> Handle(GetUserResultQuery request, CancellationToken cancellationToken)
        {
            var userDetail = await _userResultRepository.GetUserResultByIdAsync(request.UserId);
            return _mapper.Map<List<UserResultResponse>>(userDetail);
        }
        #endregion
    }
}
