using AssessmentPortal.Application.Exceptions;
using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Application.ViewModels;
using AssessmentPortal.Domain.CoreModels;
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
    public class GetTopScoreByUserAssessmentIdQueryHandler:IRequestHandler<GetTopScoreByUserAssessmentIdQuery, List<UserResultResponse>>
    {
        #region Constructor
        private readonly IUserResultRepository _userResultRepository;
        private readonly IMapper _mapper;
        public GetTopScoreByUserAssessmentIdQueryHandler(IUserResultRepository userResultRepository,IMapper mapper)
        {
            _userResultRepository = userResultRepository;
            _mapper = mapper;
        }
        #endregion
        #region Get count of completed assessments
        public async Task<List<UserResultResponse>> Handle(GetTopScoreByUserAssessmentIdQuery request, CancellationToken cancellationToken)
        {
            var userResults = await _userResultRepository.GetComparedUserResultByIdAsync(request.UserId) ??
                throw new CustomException("CantEmpty");
            return _mapper.Map<List<UserResultResponse>>(userResults);
        }
        #endregion
    }
}
