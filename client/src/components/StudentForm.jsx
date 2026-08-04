import { useForm } from 'react-hook-form'
import { Alert, Button, Field, Input, NativeSelect, Stack } from '@chakra-ui/react'

function StudentForm({ defaultValues, onSubmit, submitLabel = 'Save', submitError }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4} maxW="480px">
        {submitError && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>{submitError}</Alert.Title>
          </Alert.Root>
        )}

        <Field.Root invalid={!!errors.name}>
          <Field.Label>Student Name</Field.Label>
          <Input {...register('name', { required: 'Name is required' })} />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.gender}>
          <Field.Label>Gender</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field {...register('gender', { required: 'Gender is required' })}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.gender?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.grade}>
          <Field.Label>Grade</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field {...register('grade', { required: 'Grade is required' })}>
              <option value="">Select grade</option>
              {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.grade?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.section}>
          <Field.Label>Section</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field {...register('section', { required: 'Section is required' })}>
              <option value="">Select section</option>
              {['A', 'B', 'C'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.section?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.parent_name}>
          <Field.Label>Parent Name</Field.Label>
          <Input {...register('parent_name', { required: 'Parent name is required' })} />
          <Field.ErrorText>{errors.parent_name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.mobile_number}>
          <Field.Label>Mobile Number</Field.Label>
          <Input
            placeholder="10-digit mobile number"
            {...register('mobile_number', {
              required: 'Mobile number is required',
              pattern: { value: /^\d{10}$/, message: 'Must be exactly 10 digits' },
            })}
          />
          <Field.ErrorText>{errors.mobile_number?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.admission_date}>
          <Field.Label>Admission Date</Field.Label>
          <Input type="date" {...register('admission_date', { required: 'Admission date is required' })} />
          <Field.ErrorText>{errors.admission_date?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" colorPalette="teal" loading={isSubmitting} alignSelf="flex-start">
          {submitLabel}
        </Button>
      </Stack>
    </form>
  )
}

export default StudentForm
