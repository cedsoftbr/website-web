import { ArrowRight, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import Turnstile from 'react-cloudflare-turnstile'

const Index = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  // Recupera a chave e garante que seja uma string
  const siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';
  
  useEffect(() => {
    console.log('Configured Turnstile Site Key:', siteKey);
  }, [siteKey]);

  // Tratamento para garantir que o componente Turnstile seja uma função válida
  const TurnstileComponent = (Turnstile as any).default || Turnstile;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    if (!turnstileToken) {
      toast({
        variant: 'destructive',
        title: 'Segurança',
        description: 'Por favor, complete a verificação "Não sou um robô".',
      })
      return
    }

    setLoading(true)
    
    try {
      const apiKey = import.meta.env.VITE_BREVO_API_KEY
      const adminEmail = import.meta.env.VITE_BREVO_ADMIN_EMAIL
      const senderEmail = import.meta.env.VITE_BREVO_SENDER_EMAIL
      const senderName = import.meta.env.VITE_BREVO_SENDER_NAME

      if (!adminEmail) {
        throw new Error('E-mail de destino não configurado (VITE_BREVO_ADMIN_EMAIL)')
      }

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: senderName || 'Site CEDSoft', email: senderEmail },
          to: [{ email: adminEmail }],
          subject: 'Nova Inscrição - CEDSoft Soluções',
          htmlContent: `
            <html>
              <body>
                <h2>Nova Inscrição Detectada</h2>
                <p>Um usuário interessado deixou o e-mail no site.</p>
                <p><strong>E-mail do Cliente:</strong> ${email}</p>
                <br>
                <hr>
                <p style="font-size: 12px; color: #666;">Este e-mail foi gerado automaticamente pelo formulário do site.</p>
              </body>
            </html>
          `
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erro ao enviar e-mail')
      }

      toast({
        title: 'Pedido enviado!',
        description: `Obrigado! Entraremos em contato através do e-mail ${email}.`,
      })
      setEmail('')
      setTurnstileToken(null)
    } catch (error: any) {
      console.error('Erro Brevo:', error)
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado',
        description: 'Não foi possível enviar sua solicitação.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background bg-hero">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          CEDSoft <span className="text-muted-foreground font-normal">Soluções</span>
        </span>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-3xl flex-col items-center justify-center px-6 pb-20 text-center">
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Algo novo está sendo
          <br />
          <span className="text-gradient">construído.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A <span className="font-medium text-foreground">CEDSoft Soluções</span> está
          desenvolvendo soluções modernas em software. Deixe seu email e seja o primeiro
          a saber quando estivermos no ar.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-md flex-col gap-3">
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="h-12 border-white/20 bg-white pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="group h-12 bg-brand px-6 font-medium text-brand-foreground shadow-glow transition-all hover:bg-brand/90 hover:shadow-[0_0_80px_hsl(var(--brand)/0.5)]"
            >
              {loading ? 'Enviando...' : 'Avise-me'}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          <div className="flex justify-center mt-2">
            {siteKey && typeof TurnstileComponent === 'function' && (
              <TurnstileComponent
                sitekey={siteKey}
                onVerify={(token: string) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                theme="light"
              />
            )}
          </div>

          <p className="mt-2 font-mono text-xs text-muted-foreground/70">
            Entraremos em contato em breve.
          </p>
        </form>
      </section>

      <footer className="absolute bottom-0 left-0 right-0 z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-6 font-mono text-xs text-muted-foreground/70">
        <span>© {new Date().getFullYear()} CEDSoft Soluções</span>
      </footer>
    </main>
  )
}

export default Index
