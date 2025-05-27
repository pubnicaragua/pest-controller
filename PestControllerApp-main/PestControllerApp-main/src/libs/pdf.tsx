/* eslint-disable jsx-a11y/alt-text */
import { DataUploadObservation } from '@/api/dataupload/type'
import { Product, ServiceProducts, ServiceTypes } from '@/api/services/type'
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import dayjs from 'dayjs'
import { colors } from '../../tailwind.config'
import ReactPDFChart from 'react-pdf-charts'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#dcdcdc',
    fontSize: '10px',
    minHeight: 820,
    // height: 820,
  },
  container: {
    margin: 8,
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    minHeight: 820,
    // height: 820,
  },
  section: {
    flexDirection: 'row',
    gap: '18px',
    marginBottom: 4,
    padding: 5,
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  semiheading: {
    fontSize: '12px',
    fontWeight: 'semibold',
  },
  gapInfo: {
    gap: 4,
  },
  yDivider: {
    width: '1.5px',
    height: '100%',
    backgroundColor: '#ffffff',
    marginLeft: '2px',
    marginRight: '2px',
  },
  lineDivider: {
    width: '100%',
    height: '1.5px',
    backgroundColor: '#a2a2a2',
  },
  image: {
    width: '120px',
    height: 'auto',
  },
  headSection: {
    margin: '0px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingBottom: '8px',
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'center',
    backgroundColor: '#206631',
    color: '#ffffff',
  },
  valueText: {
    width: 16,
    border: `1px solid ${colors.gray.DEFAULT}`,
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 2,
  },
})

export const CertificateOfServicesPDF = (
  data: DataUploadObservation,
  products: ServiceProducts[],
  pestData
) => {
  const { dataupload, observation } = data
  const {
    dataupload: { serviceId, clientId },
  } = data

  let serviceProducts = []
  let product: Product
  let productLabel: string
  if (
    serviceId.serviceType === ServiceTypes.DESINFECCIÓN ||
    serviceId.serviceType === ServiceTypes.DESINSECTACIÓN ||
    serviceId.serviceType === ServiceTypes.DESRATIZACIÓN
  ) {
    serviceProducts = products.find(
      product => product.serviceType === serviceId.serviceType
    ).products

    product = serviceProducts.find(product => product.name === dataupload.product)
    productLabel = `${product.name} (${product.description})(R.ISP: ${product.risp})`
  }

  const serviceDate = dayjs(serviceId.serviceDate).format('DD/MM/YYYY')
  const startTime = dayjs(serviceId.startTime).format('HH:mm')
  const finishTime = dayjs(serviceId.finishTime).format('HH:mm')

  // Google maps
  const staticApiMap = process.env.NEXT_PUBLIC_GOOGLE_MAPS_STATIC_API
  const centerMap = `${serviceId.geolocation.lat},${serviceId.geolocation.lng}`
  const zoomMap = 16
  const apiKeyMap = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // Observations detail - Desratizado
  const obsWithObs =
    observation?.activities.length > 0 && observation.activities?.filter(act => act.obs >= 1)

  const dsgCc = dataupload?.dosage?.split('/')[0]
  const dsgLts = dataupload?.dosage?.split('/')[1]
  const dosageLabel = `${dsgCc} cc / ${dsgLts} Lts. agua`

  const renderService = () => {
    switch (serviceId.serviceType) {
      case ServiceTypes.DESRATIZACIÓN:
        return (
          <View style={{ flexDirection: 'column', gap: '10px' }}>
            <Text style={styles.semiheading}>DESRATIZACIÓN</Text>
            <View style={{ flexDirection: 'column', gap: 8 }}>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <View style={{ flexDirection: 'column', flexBasis: '35%', gap: 10 }}>
                  <View style={{ flexDirection: 'column', gap: '4px' }}>
                    <Text style={{ fontWeight: 'bold' }}>.1| Químicos</Text>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>
                        {dataupload.devices[0]['Puntos instalados'] ?? 0}
                      </Text>
                      <Text>Puntos instalados</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>
                        {dataupload.devices[1]['Puntos existentes'] ?? 0}
                      </Text>
                      <Text>Puntos existentes</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>
                        {dataupload.devices[2]['Puntos repuestos'] ?? 0}
                      </Text>
                      <Text>Puntos repuestos</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={{ ...styles.valueText, width: 20 }}>
                        {dataupload.devices[3]['Peso cebo instalado (gramos)'] ?? 0}
                      </Text>
                      <Text>Peso cebo instalado (gramos)</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', gap: '4px' }}>
                    <Text style={{ fontWeight: 'bold' }}>.2| Físicos</Text>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>
                        {dataupload.devices[4]['Puntos físicos instalados'] ?? 0}
                      </Text>
                      <Text>Puntos físicos instalados</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>
                        {dataupload.devices[5]['Puntos físicos existentes'] ?? 0}
                      </Text>
                      <Text>Puntos físicos existentes</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>
                        {dataupload.devices[6]['Puntos físicos repuestos'] ?? 0}
                      </Text>
                      <Text>Puntos físicos repuestos</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', flexGrow: 1, ...styles.gapInfo }}>
                  <Text style={styles.semiheading}>Producto utilizado</Text>
                  <Text>{productLabel}</Text>
                  <View style={styles.lineDivider} />
                  <Text style={styles.semiheading}>Obsevaciones</Text>
                  <View
                    style={{
                      ...styles.gapInfo,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flexDirection: 'column', gap: 8 }}>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>1| Roído</Text>
                        <Text style={styles.valueText}>{observation.total.gnawed}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>2| Muestra roedor</Text>
                        <Text style={styles.valueText}>{observation.total.rodentSample}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>3| Sustraído</Text>
                        <Text style={styles.valueText}>{observation.total.stolen}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>4| Destruido</Text>
                        <Text style={styles.valueText}>{observation.total.destroyed}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>5| Hongo</Text>
                        <Text style={styles.valueText}>{observation.total.fungus}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 8 }}>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>6| Polvo</Text>
                        <Text style={styles.valueText}>{observation.total.dust}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>7| Captura roedor</Text>
                        <Text style={styles.valueText}>{observation.total.rodentCapture}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>8| Bloqueado</Text>
                        <Text style={styles.valueText}>{observation.total.blocked}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>9| Babosa</Text>
                        <Text style={styles.valueText}>{observation.total.slug}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 8 }}>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>PUNTOS INSTALADOS</Text>
                        <Text style={styles.valueText}>{observation.total.installedPoints}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.gapInfo,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>TOTAL SIN ACTIVIDAD</Text>
                        <Text style={styles.valueText}>{observation.total.noActivityTotal}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.lineDivider} />
          </View>
        )

      case ServiceTypes.DESINFECCIÓN:
        return (
          <View style={{ flexDirection: 'column', gap: '14px' }}>
            <Text style={styles.semiheading}>DESINFECCIÓN</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flexBasis: '40%' }}>Dosis: {dosageLabel}</Text>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.semiheading}>Producto utilizado</Text>
                <Text>{productLabel}</Text>
              </View>
            </View>
            <View style={styles.lineDivider} />
          </View>
        )

      case ServiceTypes.DESINSECTACIÓN:
        return (
          <View style={{ flexDirection: 'column', gap: '14px' }}>
            <Text style={styles.semiheading}>DESINSECTACIÓN</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', flexBasis: '40%' }}>
                <View style={{ flexDirection: 'column', gap: '8px', maxWidth: '90%' }}>
                  <Text>Dosis: {dosageLabel}</Text>
                  <View style={styles.lineDivider} />
                  <View style={{ flexDirection: 'column', gap: '4px' }}>
                    <Text style={styles.semiheading}>Lámparas ultravioletas</Text>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>{dataupload.devices[0]['TUV'] ?? 0}</Text>
                      <Text>TUV</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>
                        {dataupload.devices[1]['Dispositivos instalados'] ?? 0}
                      </Text>
                      <Text>Dispositivos instalados</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>
                        {dataupload.devices[2]['Dispositivos existentes'] ?? 0}
                      </Text>
                      <Text>Dispositivos existentes</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                      <Text style={styles.valueText}>
                        {dataupload.devices[3]['Dispositivos repuestos'] ?? 0}
                      </Text>
                      <Text>Dispositivos repuestos</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.semiheading}>Producto utilizado</Text>
                <Text>{productLabel}</Text>
              </View>
            </View>
            <View style={styles.lineDivider} />
          </View>
        )

      default:
        return (
          <View style={{ flexDirection: 'column', gap: '14px' }}>
            <Text style={styles.semiheading}>{serviceId.serviceType}</Text>
            <View style={styles.lineDivider} />
          </View>
        )
    }
  }

  return (
    <Document title="CERTIFICADO DE SERVICIOS">
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* ENCABEZADOS */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: 'column', gap: '4px' }}>
              <Image src={'/images/pest-controller.png'} style={styles.image} />
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Text style={styles.title}>CERTIFICADO DE SERVICIOS</Text>
            </View>
            <View style={{ flexDirection: 'column', gap: '4px' }}>
              <Image src={'/images/pest-logo.png'} style={styles.image} />
              <Text>www.pestcontroller.cl</Text>
            </View>
          </View>
          {/* INFORMACIÓN GENERAL */}
          <View style={{ ...styles.section, ...styles.gapInfo, flexDirection: 'column' }}>
            <Text>PEST CONTROLLER SPA</Text>
            <Text>DESRATIZACION Y FUMIGACION NO AGRICOLA, SERVICIO CONTROL DE PLAGAS</Text>
            <Text>Millan 285, Rancagua, Rancagua</Text>
            <Text>contacto@pestcontroller.cl</Text>
            <View style={{ ...styles.lineDivider, marginVertical: 8 }} />
          </View>
          {/* INFORMACIÓN DEL CLIENTE */}
          <View style={{ ...styles.section, ...styles.gapInfo, justifyContent: 'space-between' }}>
            <View style={{ ...styles.gapInfo, flexDirection: 'column' }}>
              <Text style={{ ...styles.heading, marginBottom: 8 }}>01 DATOS CLIENTE</Text>
              <Text>Cliente: {clientId.businessName}</Text>
              <Text>Dirección: {clientId.address}</Text>
              <Text>Nombre Solicitante: {clientId.contact}</Text>
              <Text>Rut Solicitante: {clientId.rut}</Text>
            </View>
            <View>
              <Image
                src={`${staticApiMap}?center=${centerMap}&zoom=${zoomMap}&size=300x200&key=${apiKeyMap}&markers=color:red%7C${centerMap}`}
                style={{ width: 230, height: 110 }}
              />
            </View>
          </View>
          <View style={{ ...styles.lineDivider, marginVertical: 8 }} />
          {/* SERVICIO REALIZADOS */}
          <View
            style={{
              ...styles.section,
              flexDirection: 'column',
              backgroundColor: '#ffffff',
            }}
          >
            <Text style={styles.heading}>02 SERVICIO REALIZADO</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ ...styles.gapInfo, flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Fecha:</Text>
                <Text>{serviceDate}</Text>
              </View>
              <View style={{ ...styles.gapInfo, flexDirection: 'row' }}>
                <Text>Hora Inicio:</Text>
                <Text>{startTime} Hr.</Text>
              </View>
              <View style={{ ...styles.gapInfo, flexDirection: 'row' }}>
                <Text>Hora Término:</Text>
                <Text>{finishTime} Hr.</Text>
              </View>
            </View>
            {renderService()}
            {/* LUGAR TRATADO Y OBSERVACIONES */}
            {serviceId.serviceType !== ServiceTypes.DESRATIZACIÓN && (
              <View style={{ flexDirection: 'column', gap: '12px' }}>
                <Text style={styles.semiheading}>LUGARES TRATADOS</Text>
                <Text>{dataupload.sites}</Text>
                <View style={styles.lineDivider} />
                <Text style={styles.semiheading}>OBSERVACIONES Y SUGERENCIAS</Text>
                <Text>{dataupload.description}</Text>
                <View style={styles.lineDivider} />
              </View>
            )}
          </View>
          {/* FIRMAS */}
          <View style={{ ...styles.section }}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
              <View
                style={{ ...styles.gapInfo, flexDirection: 'column', justifyContent: 'flex-end' }}
              >
                <Image
                  src={dataupload.signatures.client.url}
                  style={{ width: 100, height: 60, marginBottom: 6 }}
                />
                <Text>{clientId.contact}</Text>
                <Text>{clientId.businessName.toUpperCase()}</Text>
              </View>
              <View style={{ ...styles.yDivider, backgroundColor: '#000000' }} />
              <View
                style={{ ...styles.gapInfo, flexDirection: 'column', justifyContent: 'flex-end' }}
              >
                <Image
                  src={dataupload.signatures.technical.url}
                  style={{ width: 100, height: 60, marginBottom: 6 }}
                />
                <Text>{`${serviceId.technicalId.name} ${serviceId.technicalId.lastname}`}</Text>
                <Text>PEST CONTROLLER SPA</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {serviceId.serviceType === ServiceTypes.DESRATIZACIÓN && (
        <Page size="A4" style={styles.page}>
          <View style={{ ...styles.container, flexDirection: 'column', gap: 8 }}>
            <View style={{ flexDirection: 'column', gap: '12px' }}>
              <Text style={styles.semiheading}>LUGARES TRATADOS</Text>
              <Text>{dataupload.sites}</Text>
              <View style={styles.lineDivider} />
              <Text style={styles.semiheading}>OBSERVACIONES Y SUGERENCIAS</Text>
              <Text>{dataupload.description}</Text>
              <View style={styles.lineDivider} />
            </View>
            {observation?.activities.length > 0 && (
              <View style={{ flexDirection: 'column', gap: 8 }}>
                <Text style={styles.semiheading}>DETALLE DE OBSERVACIONES</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: 4,
                  }}
                >
                  {obsWithObs.map(({ ec, obs, detail, image }) => (
                    <View
                      key={ec}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexBasis: '50%',
                        marginBottom: 16,
                      }}
                    >
                      <View style={{ ...styles.gapInfo, flexDirection: 'column' }}>
                        <View style={{ flexDirection: image?.url ? 'row' : 'column', gap: 2 }}>
                          <Text>Cebadera #{ec}</Text>
                          {image?.url && (
                            <View style={{ ...styles.yDivider, backgroundColor: '#a2a2a2' }} />
                          )}
                          <Text>Observación #{obs}</Text>
                        </View>
                        {image?.url && (
                          <Image src={image?.url} style={{ width: 150, height: 120 }} />
                        )}
                        <Text>{detail ? `${detail}` : 'Sin detalles'}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </Page>
      )}
      {(dataupload.images?.length > 0 || serviceId.serviceType === ServiceTypes.DESRATIZACIÓN) && (
        <Page size="A4" style={styles.page}>
          <View style={{ ...styles.container, flexDirection: 'column', gap: 8 }}>
            {dataupload.images?.length > 0 && (
              <View style={{ flexDirection: 'column', gap: 8 }}>
                <Text style={styles.semiheading}>IMÁGENES DEL SERVICIO</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  {dataupload.images.map(({ publicId, url }) => (
                    <View
                      key={publicId}
                      style={{
                        flexBasis: '45%',
                      }}
                    >
                      <Image src={url} style={{ width: '100%', height: 280 }} />
                    </View>
                  ))}
                </View>
              </View>
            )}
            {dataupload.images?.length > 0 &&
              serviceId.serviceType === ServiceTypes.DESRATIZACIÓN && (
                <View style={styles.lineDivider} />
              )}
            {serviceId.serviceType === ServiceTypes.DESRATIZACIÓN && (
              <View style={{ flexDirection: 'column', gap: 8 }}>
                <Text style={styles.semiheading}>HISTORIAL DE DESRATIZACIONES</Text>
                <Text>Últimos 10 servicios realizados</Text>
                <ReactPDFChart>
                  <LineChart data={pestData} height={300} width={500}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5" />
                    <Line
                      type="linear"
                      label="Roedores"
                      dataKey="roedores"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ReactPDFChart>
              </View>
            )}
          </View>
        </Page>
      )}
    </Document>
  )
}
