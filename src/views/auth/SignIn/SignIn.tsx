import Alert from '@/components/ui/Alert'
import SignInForm from './components/SignInForm'
import OauthSignIn from './components/OauthSignIn'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'

type SignInProps = {
    signUpUrl?: string
    forgetPasswordUrl?: string
    disableSubmit?: boolean
}

export const SignInBase = ({
    signUpUrl = '/sign-up',
    forgetPasswordUrl = '/forgot-password',
    disableSubmit,
}: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()

    return (
        <div className="flex flex-col gap-6">
            {message && (
                <Alert showIcon className="mb-4 bg-red-500/10 border-red-500/20 text-red-200" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignInForm
                disableSubmit={disableSubmit}
                setMessage={setMessage}
                passwordHint={
                    <div className="flex justify-end mb-4">
                        <ActionLink
                            to={forgetPasswordUrl}
                            className="text-white/60 hover:text-white text-xs font-medium transition-colors"
                            themeColor={false}
                        >
                            Forgot password?
                        </ActionLink>
                    </div>
                }
            />
        </div>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
