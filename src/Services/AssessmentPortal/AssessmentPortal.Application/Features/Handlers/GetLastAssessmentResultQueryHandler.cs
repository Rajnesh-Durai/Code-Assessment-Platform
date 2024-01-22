using AssessmentPortal.Application.Exceptions;
using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Application.ViewModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssessmentPortal.Application.Features.Handlers
{
    public class GetLastAssessmentResultQueryHandler:IRequestHandler<GetLastAssessmentResultQuery, UserResultResponse>
    {
        #region Constructor
        private readonly IUserResultRepository _userResultRepository;
        private readonly IMapper _mapper;
        public GetLastAssessmentResultQueryHandler(IUserResultRepository userResultRepository,IMapper mapper)
        {
            _userResultRepository = userResultRepository;
            _mapper = mapper;
        }
        #endregion
        #region Get last assessment result of a particular user
        public async Task<UserResultResponse> Handle(GetLastAssessmentResultQuery request, CancellationToken cancellationToken)
        {
            var userResults = await _userResultRepository.GetLastUserResultByIdAsync(request.UserId);
            var mapUserResult = _mapper.Map<List<UserResultResponse>>(userResults);
            return mapUserResult.Last();
        }
        #endregion
    }
}
