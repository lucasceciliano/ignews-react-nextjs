import { signIn, useSession } from 'next-auth/client'
import { api } from '../../services/api'
import styles from './styles.module.scss'
import { getStripeJs } from '../../services/stripe-js'

interface SubscribeButtoProps {
    priceId: string
}

export function SubscribeButton({priceId}: SubscribeButtoProps) {

    const [session] = useSession()

    async function handleSubscribe() {
        if(!session) {
        signIn('github')
        return
        }


        try{
            const response = await api.post('/subscribe')

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId})
        } catch (err) {
            alert(err.menssage);
        }
    }

    return(
        <button
        type="button"
        className={styles.subscribeButton}
        >
            Subscribe Now
        </button>
    )
}