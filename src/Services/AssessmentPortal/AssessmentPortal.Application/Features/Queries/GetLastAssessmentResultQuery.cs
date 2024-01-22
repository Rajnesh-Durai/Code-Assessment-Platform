using AssessmentPortal.Application.ViewModels;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssessmentPortal.Application.Features.Queries
{
    public class GetLastAssessmentResultQuery:IRequest<UserResultResponse>
    {
        public Guid UserId { get; set; }
    }
}
