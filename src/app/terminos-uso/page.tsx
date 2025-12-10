import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSiteConfig } from '@/lib/site-config'

export async function generateMetadata() {
  const config = await getSiteConfig()

  return {
    title: `Términos de Uso | ${config.companyName}`,
    description: 'Términos y condiciones de uso de nuestro sitio web y servicios inmobiliarios.',
  }
}

export default async function TerminosUsoPage() {
  const config = await getSiteConfig()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header config={config} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos de Uso</h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Aceptación de los términos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Al acceder y utilizar este sitio web, usted acepta cumplir con estos términos de uso
                y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos,
                le prohibimos utilizar o acceder a este sitio.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso.
                Su uso continuado del sitio web constituye la aceptación de dichas modificaciones.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Uso del sitio web</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Este sitio web está destinado a proporcionar información sobre propiedades inmobiliarias
                y servicios relacionados. Usted se compromete a utilizar el sitio únicamente para fines legítimos y de manera
                que no infrinja los derechos de terceros o restrinja o inhiba su uso y disfrute del sitio.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Está prohibido utilizar el sitio para:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Actividades fraudulentas o ilegales</li>
                <li>Envío de spam o comunicaciones no solicitadas</li>
                <li>Interferir con el funcionamiento del sitio</li>
                <li>Acceder a áreas restringidas sin autorización</li>
                <li>Violar los derechos de propiedad intelectual</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Información de propiedades</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                La información sobre propiedades mostrada en este sitio se proporciona únicamente con fines informativos.
                Aunque nos esforzamos por mantener la información actualizada y precisa, no garantizamos su exactitud,
                integridad o disponibilidad.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Los precios, disponibilidad y características de las propiedades están sujetos a cambios sin previo aviso.
                Le recomendamos verificar toda la información directamente con nuestros agentes antes de tomar cualquier decisión.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Propiedad intelectual</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos,
                imágenes, fotografías, videos y software, está protegido por derechos de autor y otras leyes de
                propiedad intelectual.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Está prohibido copiar, distribuir, modificar, transmitir, reutilizar, republicar o usar
                el contenido para fines comerciales sin nuestro consentimiento previo por escrito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Limitación de responsabilidad</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                En la máxima medida permitida por la ley, no seremos responsables por ningún daño directo,
                indirecto, incidental, especial, consecuente o punitivo que resulte del uso o la imposibilidad
                de usar este sitio web.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Esto incluye, pero no se limita a, daños por pérdida de beneficios, datos, uso, buena voluntad
                u otras pérdidas intangibles, incluso si hemos sido advertidos de la posibilidad de tales daños.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Servicios de terceros</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Este sitio web puede contener enlaces a sitios web de terceros o integrar servicios de terceros.
                No tenemos control sobre el contenido, políticas de privacidad o prácticas de estos sitios o servicios.
              </p>
              <p className="text-gray-600 leading-relaxed">
                No endorsamos ni somos responsables por el contenido o las prácticas de sitios web de terceros.
                Le recomendamos revisar los términos y políticas de cualquier sitio de terceros que visite.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Privacidad</h2>
              <p className="text-gray-600 leading-relaxed">
                Su privacidad es importante para nosotros. El uso de este sitio web está también sujeto a
                nuestra <a href="/politica-privacidad" className="text-blue-600 hover:text-blue-800 underline">
                Política de Privacidad</a>, la cual describe cómo recopilamos, utilizamos y protegemos su información personal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Indemnización</h2>
              <p className="text-gray-600 leading-relaxed">
                Usted acepta indemnizar y eximir de responsabilidad a la empresa, sus directores, empleados,
                agentes y afiliados de cualquier reclamación, pérdida, responsabilidad, daño, costo o gasto
                (incluyendo honorarios de abogados) que surja del uso del sitio web o de la violación de estos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Terminación</h2>
              <p className="text-gray-600 leading-relaxed">
                Podemos terminar o suspender su acceso al sitio web inmediatamente, sin previo aviso o responsabilidad,
                por cualquier motivo, incluyendo si viola estos términos de uso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Ley aplicable</h2>
              <p className="text-gray-600 leading-relaxed">
                Estos términos se regirán e interpretarán de acuerdo con las leyes de la República Argentina,
                sin dar efecto a cualquier principio de conflictos de ley. Cualquier disputa será sometida
                a la jurisdicción exclusiva de los tribunales de Argentina.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Contacto</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Si tiene preguntas sobre estos términos de uso, puede contactarnos a través de:
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