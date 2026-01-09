import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ASAAS_API_KEY = Deno.env.get('ASAAS_API_KEY')!
const ASAAS_ENDPOINT = Deno.env.get('ASAAS_ENDPOINT')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const subscriptionId = url.searchParams.get('subscriptionId')
    const paymentId = url.searchParams.get('paymentId')

    if (subscriptionId) {
      // Buscar pagamentos da assinatura
      console.log('📝 Buscando pagamentos da assinatura:', subscriptionId)
      
      const response = await fetch(`${ASAAS_ENDPOINT}/subscriptions/${subscriptionId}/payments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access_token': ASAAS_API_KEY,
        },
      })

      const data = await response.json()
      
      return new Response(
        JSON.stringify(data),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    if (paymentId) {
      // Buscar QR Code do pagamento
      console.log('📝 Buscando QR Code PIX:', paymentId)
      
      const response = await fetch(`${ASAAS_ENDPOINT}/payments/${paymentId}/pixQrCode`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access_token': ASAAS_API_KEY,
        },
      })

      const data = await response.json()
      
      return new Response(
        JSON.stringify(data),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Missing subscriptionId or paymentId' }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('❌ Erro:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
