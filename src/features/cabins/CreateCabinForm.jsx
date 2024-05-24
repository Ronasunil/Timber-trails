import styled from "styled-components";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from '../../ui/FormRow'
import Label from '../../ui/Label';
import Error from '../../ui/Error'


import cabinSchema from "../../form-schemas/cabinSchema";
import toast from "react-hot-toast";
import { SUPABASE_URL } from "../../services/supabase";
import { useCreateCabin } from "./useCreateCabin";
import { useContext } from "react";
import { MenuContext } from "../../ui/Menu";



function CreateCabinForm({func='create', data = {}, id=null, type, handleClose}) {
  const {close} = useContext(MenuContext)
  const {register, handleSubmit, formState:{errors}} = useForm({resolver:yupResolver(cabinSchema), defaultValues:data});


 const {isLoading, createCabin } =  useCreateCabin()

const onSubmit = async function(data) {


    // creating cabin
    if(!id)
      createCabin({...data, cabinImage: data.cabinImage[0] || ''}, {
        onSuccess:() => {
          toast.success("Cabin created successfully") ;
          handleClose();
          close()

        }
      });
    
    //editing cabin 
    //edit cabin is also done with create cabin 
    if(id) createCabin({...data, id, cabinImage:typeof data.cabinImage === 'string' && data?.cabinImage.startsWith(SUPABASE_URL) ? data.cabinImage : data.cabinImage[0] },{
      onSuccess:() => {
        toast.success("Cabin edited successfully");
        handleClose();
        close();
      }  
    
    })

  }


  return (
    <Form type={type}  onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input disabled={isLoading} {...register("name")} type="text" id="name" />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input disabled={isLoading} {...register("maxCapacity")} type="number" id="maxCapacity" />
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="minCapacity">Minimum capacity</Label>
        <Input disabled={isLoading} {...register('minCapacity')} id="minCapacity" />
        {errors?.minCapacity?.message && <Error>{errors.minCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="price">price</Label>
        <Input disabled={isLoading} {...register("price")} type="number" id="price" />
        {errors?.price?.message && <Error>{errors.price.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input disabled={isLoading} {...register("discount")} type="number" id="discount" defaultValue={0} />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea {...register("description")} type="number" id="description" defaultValue="" />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="cabinImage">Cabin photo</Label>
        <FileInput {...register('cabinImage')}  id="cabinImage" accept="image/*" type="file" />
      </FormRow>

      <FormRow>
       
        <Button variation="secondary" size='medium' type="reset">
          reset
        </Button>
        <Button variation="primary"  size="medium" >{func === 'edit' ? 'Edit' : 'Add to cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;


