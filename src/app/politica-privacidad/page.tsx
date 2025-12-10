import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSiteConfig } from '@/lib/site-config'

export async function generateMetadata() {
  const config = await getSiteConfig()

  return {
    title: `Política de Privacidad | ${config.companyName}`,
    description: 'Política de privacidad y tratamiento de datos personales de nuestra inmobiliaria.',
  }
}

export default async function PoliticaPrivacidadPage() {
  const config = await getSiteConfig()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header config={config} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Información que recopilamos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Recopilamos información que usted nos proporciona directamente cuando:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Se pone en contacto con nosotros a través de nuestros formularios de contacto</li>
                <li>Solicita información sobre propiedades</li>
                <li>Se suscribe a nuestro boletín informativo</li>
                <li>Utiliza nuestros servicios inmobiliarios</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Cómo utilizamos su información</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Responder a sus consultas y brindar atención al cliente</li>
                <li>Proporcionar información sobre propiedades que puedan ser de su interés</li>
                <li>Mejorar nuestros servicios y experiencia del usuario</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
                <li>Enviar comunicaciones relacionadas con nuestros servicios</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Protección de datos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger
                su información personal contra el acceso no autorizado, alteración, divulgación o destrucción.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Sus datos personales son tratados de manera confidencial y solo son accesibles por
                personal autorizado que necesita esta información para realizar sus funciones laborales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Compartir información</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                No vendemos, alquilamos ni compartimos su información personal con terceros, excepto en los siguientes casos:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Cuando usted nos otorga su consentimiento explícito</li>
                <li>Para cumplir con obligaciones legales o regulatorias</li>
                <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                <li>En caso de fusión, adquisición o venta de activos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Sus derechos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Acceder a sus datos personales</li>
                <li>Rectificar datos inexactos o incompletos</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al tratamiento de sus datos</li>
                <li>Solicitar la limitación del tratamiento</li>
                <li>Retirar su consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Cookies y tecnologías similares</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia
                de navegación, analizar el tráfico del sitio y personalizar el contenido.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Puede controlar y/o eliminar las cookies según desee a través de la configuración de su navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Retención de datos</h2>
              <p className="text-gray-600 leading-relaxed">
                Mantenemos sus datos personales solo durante el tiempo necesario para los fines para
                los cuales fueron recopilados o según lo requiera la ley aplicable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Cambios en esta política</h2>
              <p className="text-gray-600 leading-relaxed">
                Podemos actualizar esta política de privacidad periódicamente. Le notificaremos sobre
                cambios significativos publicando la nueva política en nuestro sitio web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Contacto</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Si tiene preguntas sobre esta política de privacidad o el tratamiento de sus datos personales,
                puede contactarnos a través de:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600"><strong>Email:</strong> {config?.email || 'info@inmobiliaria.com'}</p>
                <p className="text-gray-600"><strong>Teléfono:</strong> {config?.phone || '+54 11 1234-5678'}</p>
                {config?.address && (
                  <p className="text-gray-600"><strong>Dirección:</strong> {config.address}</p>
                )}
              </div>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Última actualización: {new Date().toLocaleDateString('es-AR')}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer config={config} />
    </div>
  )
}