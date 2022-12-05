import { Layout, Input, Button, Space, Typography, message } from "antd"
import { UserOutlined, SafetyOutlined } from "@ant-design/icons"
import { StyledForm, FlexContainer } from "./style"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import UseUserContext from "../../providers/user"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface LoginFormFields {
  full_name: string
  password: string
}

const registerSchema = yup.object({
  full_name: yup.string().max(50).required(),
  password: yup.string().required()
})

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { login } = UseUserContext()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormFields>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: false,
    shouldUnregister: false,
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = async (data: LoginFormFields) => {
    setIsLoading(true)

    await login(data).then((res) => {
      if (res) {
        message.success("login successfully", 2)
        setTimeout(() => navigate("/profile"), 2000)
      }
    })

    setIsLoading(false)
  }

  return (
    <Layout.Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography.Title level={1}>Login</Typography.Title>

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

        <FlexContainer>
          <Button
            htmlType="submit"
            loading={isLoading}
            size="large"
            style={{ width: "45%" }}
          >
            Login
          </Button>

          <Button
            size="large"
            style={{ width: "45%" }}
            onClick={() => navigate("/")}
          >
            Registration
          </Button>
        </FlexContainer>
      </StyledForm>
    </Layout.Content>
  )
}

export default Login
