/*using FluentValidation;
using MediatR;
using ValidationException = AssessmentPortal.Application.Exceptions.CustomException;

namespace AssessmentPortal.Application.Behaviours;
public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
     where TRequest : notnull
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (_validators.Any())
        {
            var context = new ValidationContext<TRequest>(request);

            var validationResults = await Task.WhenAll(
                _validators.Select(v =>
                    v.ValidateAsync(context, cancellationToken)));

            var failures = validationResults
                .Where(r => r.Errors.Any())
                .SelectMany(r => r.Errors)
                .ToList();


            if (failures.Any())
            {
                var exceptionMessage = string.Join(Environment.NewLine, failures.Select(failure => failure.ErrorMessage));
                throw new ValidationException(exceptionMessage);
            }
        }
        return await next();
    }
}

*/