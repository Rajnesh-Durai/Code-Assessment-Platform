using System.Net;

namespace AssessmentPortal.Application.ViewModels
{
    public record ExceptionResponse(HttpStatusCode StatusCode, string Description, string ErrorCode);
}
