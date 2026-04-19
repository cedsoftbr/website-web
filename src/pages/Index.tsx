import { ArrowRight, Mail } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import Turnstile from 'react-cloudflare-turnstile'

const Index = () => {
  console.log('Turnstile import:', Turnstile);
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          cf_turnstile_token: turnstileToken
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Erro ao se cadastrar')
      }

      toast({
        title: 'Cadastro confirmado',
        description: `Avisaremos ${email} assim que estivermos no ar.`,
      })
      setEmail('')
      setTurnstileToken(null) // Reset token after success
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado',
        description: error.message || 'Não foi possível salvar seu email. Tente novamente mais tarde.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background bg-hero">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          CEDSoft <span className="text-muted-foreground font-normal">Soluções</span>
        </span>
      </header>

      {/* Hero */}
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-md flex-col gap-3"
        >
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
          
          <p className="mt-2 font-mono text-xs text-muted-foreground/70">
            Sem spam. Só uma mensagem quando lançarmos.
          </p>

          <div className="flex justify-center mt-2">
            {(() => {
              const TurnstileComponent = (Turnstile as any).default || Turnstile;
              return (
                <TurnstileComponent
                  turnstileSiteKey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                  callback={(token: string) => setTurnstileToken(token)}
                  expiredCallback={() => setTurnstileToken(null)}
                  theme="light"
                />
              );
            })()}
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-6 font-mono text-xs text-muted-foreground/70">
        <span>© {new Date().getFullYear()} CEDSoft Soluções</span>
      </footer>
    </main>
  )
}

export default Index
