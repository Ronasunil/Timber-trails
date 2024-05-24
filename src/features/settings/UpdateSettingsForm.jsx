import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Label from '../../ui/Label';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSettings } from './useUpdateSettings';


function UpdateSettingsForm() {
  const {settings, isLoading} = useSettings();
  const {updateSettings, isUpdating} = useUpdateSettings()


  const {minBookingLength, maxBookingLength, maxGuestPerBooking, breakfastPrice} = settings || {}

  if(isLoading) return <Spinner/>

  const handleUpdate = function(value, fieldName) {

    // if there is no value return
    if(!value) return;

    // if no modification happens
    if(settings[fieldName] === +value) return;

    updateSettings({[fieldName]: value});
  }

  return (
    <Form>
      <FormRow >
        <Label>Minimum nights/booking</Label>
        <Input disabled={isUpdating} onBlur={(e) => handleUpdate(e.target.value, 'minBookingLength')} type='number' id='min-nights' defaultValue={minBookingLength} />
      </FormRow>
      <FormRow>
        <Label>Maximum nights/booking</Label>
        <Input disabled={isUpdating} onBlur={(e) => handleUpdate(e.target.value, 'maxBookingLength')} type='number' id='max-nights' defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow>
        <Label>Maximum guests/booking</Label>
        <Input disabled={isUpdating} onBlur={(e) => handleUpdate(e.target.value, 'maxGuestPerBooking')} type='number' id='max-guests' defaultValue={maxGuestPerBooking} />
      </FormRow>
      <FormRow>
        <Label>Breakfast price</Label>
        <Input disabled={isUpdating} onBlur={(e) => handleUpdate(e.target.value, 'breakfastPrice')} id='breakfast-price' defaultValue={breakfastPrice} type='number'  />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;




