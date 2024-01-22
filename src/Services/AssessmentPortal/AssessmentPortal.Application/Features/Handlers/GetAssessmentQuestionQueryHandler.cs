using AssessmentPortal.Application.Features.Queries;
using AssessmentPortal.Application.ViewModels;
using AssessmentPortal.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AssessmentPortal.Application.Features.Handlers
{
    public class GetAssessmentQuestionQueryHandler : IRequestHandler<GetAssessmentQuestionQuery, List<AssessmentQuestionResponse>>
    {
        #region Constructor
        private readonly IAssessmentQuestionRepository _assessmentQuestionRepository;
        private readonly IMapper _mapper;
        public GetAssessmentQuestionQueryHandler(IAssessmentQuestionRepository assessmentQuestionRepository, IMapper mapper)
        {
            _assessmentQuestionRepository = assessmentQuestionRepository;
            _mapper = mapper;
        }
        #endregion
        #region Get Assessment question by id
        public async Task<List<AssessmentQuestionResponse>> Handle(GetAssessmentQuestionQuery request, CancellationToken cancellationToken)
        {
            var assessmentQuestion = await _assessmentQuestionRepository.GetAssessmentQuestionByIdAsync(request.UserAssessmentId);
            return _mapper.Map<List<AssessmentQuestionResponse>>(assessmentQuestion);
        }
        #endregion
    }
}
