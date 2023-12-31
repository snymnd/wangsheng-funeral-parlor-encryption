import clsx from 'clsx';
import get from 'lodash.get';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import Typography from '@/components/typography/Typography';

export type TextAreaProps = {
  label: string | null;
  id: string;
  placeholder?: string;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  containerClassName?: string;
  className?: string;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function TextArea({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError = false,
  validation,
  disabled,
  containerClassName,
  className,
  ...rest
}: TextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Typography
          as='label'
          variant='s3'
          className='block'
          color='secondary'
          htmlFor={id}
        >
          {label}
        </Typography>
      )}
      <div className={clsx('relative', withLabel && 'mt-1')}>
        <textarea
          {...register(id, validation)}
          rows={3}
          {...rest}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={clsx(
            className,
            'block w-full rounded text-base-1000 shadow-sm',
            'border-gray-300 focus:border-primary-600 focus:ring-primary-600',
            'plcaeholder:text-neutral-secondary',
            disabled &&
              'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
            readOnly &&
              'cursor-default border-primary-600 bg-transparent text-white',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
      </div>
      {helperText && (
        <Typography variant='c1' color='secondary' className='mt-1'>
          {helperText}
        </Typography>
      )}
      {!hideError && error && (
        <Typography variant='c1' color='danger' className='mt-1'>
          {error?.message?.toString()}
        </Typography>
      )}
    </div>
  );
}
