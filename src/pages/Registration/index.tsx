import { Layout, Input, Button, Space, Typography, message } from "antd"
import {
  UserOutlined,
  SafetyOutlined,
  PaperClipOutlined,
  PhoneOutlined
} from "@ant-design/icons"
import { StyledForm, FlexContainer } from "./style"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import UseUserContext, { CreateUserData } from "../../providers/user"
import { useState } from "react"

import { useNavigate } from "react-router-dom"

interface RegisterFormFields {
  full_name: string
  password: string
  email: string
  number: string
}

const registerSchema = yup.object({
  full_name: yup.string().max(50).required(),
  password: yup.string().required(),
  email: yup.string().max(40).email().required(),
  number: yup
    .string()
    .min(9)
    .max(13)
    .matches(/^[0-9]+$/, "This field must have only numbers")
    .required()
})

const Registration = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { createUser } = UseUserContext()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormFields>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: false,
    shouldUnregister: false,
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormFields) => {
    setIsLoading(true)

    const formatedData: CreateUserData = {
      full_name: data.full_name,
      password: data.password,
      emails: [data.email],
      numbers: [data.number]
    }

    await createUser(formatedData)
      .then(() => message.success("user created successfully", 2))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
        navigate("/login")
      })
  }

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography.Title level={1}>Registration</Typography.Title>

        <Controller
          name="full_name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Space
              direction="vertical"
              style={{
                width: "100%"
              }}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your full name"
                onChange={onChange}
                value={value}
                size="large"
                style={{
                  width: "100vw",
                  maxWidth: "400px"
                }}
              />
              {errors?.full_name && (
                <span className="input__span--error">
                  {errors.full_name?.message}
                </span>
              )}
            </Space>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Space
              direction="vertical"
              style={{
                width: "100%"
              }}
            >
              <Input.Password
                placeholder="Enter your password"
                prefix={<SafetyOutlined />}
                onChange={onChange}
                value={value}
                size="large"
                style={{
                  width: "100vw",
                  maxWidth: "400px"
                }}
              />
              {errors?.password && (
                <span className="input__span--error">
                  {errors.password?.message}
                </span>
              )}
            </Space>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Space
              direction="vertical"
              style={{
                width: "100%"
              }}
            >
              <Input
                prefix={<PaperClipOutlined />}
                placeholder="Enter your email"
                onChange={onChange}
                value={value}
                size="large"
                style={{
                  width: "100vw",
                  maxWidth: "400px"
                }}
              />
              {errors?.email && (
                <span className="input__span--error">
                  {errors.email?.message}
                </span>
              )}
            </Space>
          )}
        />
        <Controller
          name="number"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Space
              direction="vertical"
              style={{
                width: "100%"
              }}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter your phone number"
                onChange={onChange}
                value={value}
                size="large"
                style={{
                  width: "100vw",
                  maxWidth: "400px"
                }}
              />
              {errors?.number && (
                <span className="input__span--error">
                  {errors.number?.message}
                </span>
              )}
            </Space>
          )}
        />

        <FlexContainer>
          <Button
            htmlType="submit"
            loading={isLoading}
            size="large"
            style={{ width: "45%" }}
          >
            Register
          </Button>

          <Button
            size="large"
            style={{ width: "45%" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </FlexContainer>
      </StyledForm>
    </Layout>
  )
}

export default Registration
