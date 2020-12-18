import absAPI from '@/api/absAPI'
import authHeader from './authHeader'

class PaymentService {
    async fetchCards(email) {
        const res = await absAPI.get('/credit_cards', {
            params: { user_email: email },
            headers: authHeader(),
        })
        return res.data
    }
    async createCard(params) {
        const res = await absAPI.post('/credit_cards', params, {
            headers: authHeader(),
        })
        return res.data
    }
}

export default new PaymentService()
