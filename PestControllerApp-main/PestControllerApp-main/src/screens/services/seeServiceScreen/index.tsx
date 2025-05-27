import {
  Service,
  ServiceDevices,
  ServiceProducts,
  ServiceStatus,
  ServiceTypes,
} from '@/api/services/type'
import { HeaderOverFlowUI, LoadingUI } from '../../../../packages/components'
import ServiceTypeSection from '@/components/services/execute/serviceTypeSection'
import { useForm } from 'react-hook-form'
import { api } from '@/api'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { DataUploadObservation } from '@/api/dataupload/type'
import { ResponseDataState } from '@/api/types'
import Image from 'next/image'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { CertificateOfServicesPDF } from '@/libs/pdf'
import { useSession } from '@/contexts/session'
import { PestsReport } from '@/api/reports/types'
import { formatPestReport } from '@/libs/recharts'

export type SeeServiceScreenProps = {
  service: Service
  products: ServiceProducts[]
  devices: ServiceDevices[]
}

const SeeServiceScreen: React.FC<SeeServiceScreenProps> = ({ service, products, devices }) => {
  const [pestData, setPestsData] = useState<PestsReport[]>()
  const [dataupload, setDataupload] = useState<ResponseDataState<DataUploadObservation>>({
    data: {} as DataUploadObservation,
    isLoading: true,
  })

  const {
    session: { isMobile },
  } = useSession()
  const { control, setValue } = useForm()

  // Filter products by service type
  const desratizacionProducts = products.find(
    product => product.serviceType === ServiceTypes.DESRATIZACIÓN
  )

  const desinfeccionProducts = products.find(
    product => product.serviceType === ServiceTypes.DESINFECCIÓN
  )

  const desinsectacionProducts = products.find(
    product => product.serviceType === ServiceTypes.DESINSECTACIÓN
  )

  // Filter devices by service type
  const desratizacionDevices = devices.find(devices => devices.type === ServiceTypes.DESRATIZACIÓN)

  const desinsectacionDevices = devices.find(
    devices => devices.type === ServiceTypes.DESINSECTACIÓN
  )

  const getDataupload = async (serviceId: string) => {
    const response = await api.dataupload.getDataupload<DataUploadObservation>(serviceId)
    if (response.status === 200) {
      setDataupload({ data: response.data, isLoading: false })
      setValues(response.data)
    } else {
      setDataupload({ data: {} as DataUploadObservation, isLoading: false })
      toast.error(response.message)
    }
  }

  const getPestsReports = async (clientId: string, serviceType: ServiceTypes) => {
    const response = await api.reports.getPestByClientReports<PestsReport[]>(clientId, serviceType)
    if (response.status === 200) {
      setPestsData(response.data)
    } else {
      toast.error(response.message)
    }
  }

  const setValues = (data: DataUploadObservation) => {
    const { dataupload, observation } = data

    if (service.serviceType !== ServiceTypes.DESRATIZACIÓN) {
      const dosage = dataupload.dosage.split('/')
      if (service.serviceType === ServiceTypes.DESINFECCIÓN) {
        setValue(ServiceTypes.DESINFECCIÓN + '-dosage', dosage[0])
        setValue(ServiceTypes.DESINFECCIÓN + '-water', dosage[1])
      } else {
        setValue(ServiceTypes.DESINSECTACIÓN + '-dosage', dosage[0])
        setValue(ServiceTypes.DESINSECTACIÓN + '-water', dosage[1])
      }
    }

    if (service.serviceType === ServiceTypes.DESRATIZACIÓN) {
      for (const key in observation.total) {
        setValue(key, observation.total[key])
      }
    }

    if (service.serviceType !== ServiceTypes.DESINFECCIÓN) {
      dataupload.devices.forEach(device => {
        for (const key in device) {
          setValue(key, device[key])
        }
      })
    }

    setValue('product', dataupload.product)
    setValue('sites', dataupload.sites)
    setValue('description', dataupload.description)
  }

  useEffect(() => {
    if (service.status === ServiceStatus.DONE) {
      getDataupload(service._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service._id, service.status])

  useEffect(() => {
    if (service.serviceType === ServiceTypes.DESRATIZACIÓN) {
      getPestsReports(service.clientId._id, service.serviceType)
    }
  }, [service.serviceType, service.clientId._id])

  if (dataupload.isLoading) return <LoadingUI />

  if (service.serviceType === ServiceTypes.DESRATIZACIÓN && !pestData) return <LoadingUI />

  const renderForm = () => {
    switch (service.serviceType) {
      case ServiceTypes.DESRATIZACIÓN:
        return (
          <fieldset disabled={service.serviceType !== ServiceTypes.DESRATIZACIÓN}>
            <ServiceTypeSection
              control={control}
              section={ServiceTypes.DESRATIZACIÓN}
              service={service}
              products={desratizacionProducts.products}
              devices={desratizacionDevices.devices}
              obsDetail={dataupload.data.observation.activities ?? []}
            />
          </fieldset>
        )

      case ServiceTypes.DESINFECCIÓN:
        return (
          <fieldset disabled={service.serviceType !== ServiceTypes.DESINFECCIÓN}>
            <ServiceTypeSection
              control={control}
              section={ServiceTypes.DESINFECCIÓN}
              service={service}
              products={desinfeccionProducts.products}
            />
          </fieldset>
        )

      case ServiceTypes.DESINSECTACIÓN:
        return (
          <fieldset disabled={service.serviceType !== ServiceTypes.DESINSECTACIÓN}>
            <ServiceTypeSection
              control={control}
              section={ServiceTypes.DESINSECTACIÓN}
              service={service}
              products={desinsectacionProducts.products}
              devices={desinsectacionDevices.devices}
            />
          </fieldset>
        )

      default:
        return (
          <fieldset>
            <ServiceTypeSection control={control} section={'CUSTOM'} service={service} />
          </fieldset>
        )
    }
  }

  return (
    <div className="flex w-full h-full items-center justify-center px-1 py-3 min-h-fit">
      <div className="flex flex-col bg-white rounded-lg px-3 pt-2 pb-5 w-full min-h-fit h-full">
        <div className="flex items-center justify-between">
          <HeaderOverFlowUI title="Servicios realizados" />
          {!isMobile && (
            <div className="text-center">
              <PDFDownloadLink
                className="btn secondary"
                document={CertificateOfServicesPDF(
                  dataupload.data,
                  products,
                  formatPestReport(pestData)
                )}
                fileName="CERTIFICADO DE SERVICIOS.pdf"
              >
                Certificado de Servicios
              </PDFDownloadLink>
            </div>
          )}
        </div>
        <fieldset disabled={service.status === ServiceStatus.DONE}>
          {renderForm()}
          <div className="flex justify-center items-center flex-col lg:flex-row gap-2">
            {dataupload.data.dataupload.images?.map(({ url }, i) => (
              <div key={i} className="lg:basis-3/12">
                <div className="bg-gray-light rounded-lg min-h-24 w-36 relative lg:min-h-40 lg:min-w-40">
                  <Image
                    src={url}
                    alt="image"
                    layout="fill"
                    objectFit="center"
                    className="rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
          {isMobile && (
            <div className="flex w-full justify-center text-center mt-4">
              <PDFDownloadLink
                className="bg-primary text-white py-3 rounded-3xl min-w-[276px]"
                document={CertificateOfServicesPDF(
                  dataupload.data,
                  products,
                  formatPestReport(pestData)
                )}
                fileName="CERTIFICADO DE SERVICIOS.pdf"
              >
                Certificado de Servicios
              </PDFDownloadLink>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  )
}

export default SeeServiceScreen
