import { useState } from 'react'
import { Input } from '@/shadcn/input'
import { Button } from '@/shadcn/button'
import { Label } from '@/shadcn/label'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    passwordHint?: string | ReactNode
    setMessage?: (message: string) => void
}

type SignInFormSchema = {
    email: string
    password: string
}

const validationSchema: ZodType<SignInFormSchema> = z.object({
    email: z
        .string({ required_error: 'Please enter your email' })
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Please enter your email' }),
    password: z
        .string({ required_error: 'Please enter your password' })
        .min(1, { message: 'Please enter your password' }),
})

const SignInForm = (props: SignInFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const { disableSubmit = false, className, setMessage, passwordHint } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignInFormSchema>({
        defaultValues: {
            email: 'admin-01@ecme.com',
            password: '123Qwe',
        },
        resolver: zodResolver(validationSchema),
    })

    const { signIn } = useAuth()

    const onSignIn = async (values: SignInFormSchema) => {
        const { email, password } = values

        if (!disableSubmit) {
            setSubmitting(true)

            const result = await signIn({ email, password })

            if (result?.status === 'failed') {
                setMessage?.(result.message)
            }
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            <form onSubmit={handleSubmit(onSignIn)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label className="text-white/80 ml-1 text-xs font-semibold uppercase tracking-wider">Email Address</Label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 px-4 rounded-xl focus:ring-primary/50 focus:border-primary/50 transition-all"
                                    {...field}
                                />
                                {errors.email && (
                                    <span className="text-red-400 text-[10px] mt-1 ml-1 font-medium">{errors.email.message}</span>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-white/80 ml-1 text-xs font-semibold uppercase tracking-wider">Password</Label>
                    </div>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 px-4 pr-12 rounded-xl focus:ring-primary/50 focus:border-primary/50 transition-all"
                                    {...field}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                {errors.password && (
                                    <span className="text-red-400 text-[10px] mt-1 ml-1 font-medium">{errors.password.message}</span>
                                )}
                            </div>
                        )}
                    />
                </div>

                {passwordHint}

                <Button
                    disabled={isSubmitting || disableSubmit}
                    className="h-12 rounded-xl bg-primary hover:bg-primary-deep text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                    type="submit"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>
        </div>
    )
}

export default SignInForm
