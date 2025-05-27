import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ServiceTypes } from '@/api/services/type'
import { ButtonUI, HeaderOverFlowUI, ModalUI } from '../../../../packages/components'
import ServiceTypeSection from '@/components/services/execute/serviceTypeSection'
import { useForm } from 'react-hook-form'
import { api } from '@/api'
import toast from 'react-hot-toast'
import {
  ObservationPayload,
  RegisterServiceDataUploadDTO,
  UploadImageDatauploadDTO,
} from '@/api/dataupload/type'
import { AddPhotoIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'
import { ActivityPayloadModal } from '@/components/services/types'
import { ExecuteServiceScreenProps } from '../types'
import SignaturePad from 'react-signature-canvas'
import ReactSignatureCanvas from 'react-signature-canvas'
import ObservationsModal from '@/components/services/observationsModal'
import { useSession } from '@/contexts/session'
import { useRouter } from 'next/navigation'
import { getFolderCloudinary, getImageFormData } from '@/utils/forms'
import { reduceImageQuality } from '@/utils/reduceQuality'

const ExecuteServiceScreen: React.FC<ExecuteServiceScreenProps> = ({
  service,
  products,
  devices,
}) => {
  const [obsFinal, setObsFinal] = useState<ActivityPayloadModal[]>([])
  const [images, setImages] = useState<{ blob: string; file: File }[]>([])
  const [showObsModal, setShowObsModal] = useState<boolean>(false)
  const [showSignModal, setShowSignModal] = useState<boolean>(false)
  const [signatures, setSignatures] = useState({ clientSign: '', technicalSign: '' })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [gps, setGps] = useState<{ lat: number; lng: number }>()

  const router = useRouter()

  const { control, handleSubmit } = useForm()
  const { session } = useSession()

  const clientSignRef = useRef<ReactSignatureCanvas>()
  const technicalSignRef = useRef<ReactSignatureCanvas>()

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

  const onSubmit = data => {
    setIsLoading(true)

    const dosage =
      service.serviceType === ServiceTypes.DESINFECCIÓN
        ? `${data[ServiceTypes.DESINFECCIÓN + '-dosage']}/${
            data[ServiceTypes.DESINFECCIÓN + '-water']
          }`
        : `${data[ServiceTypes.DESINSECTACIÓN + '-dosage']}/${
            data[ServiceTypes.DESINSECTACIÓN + '-water']
          }`

    const devices =
      service.serviceType === ServiceTypes.DESRATIZACIÓN
        ? [
            { 'Puntos instalados': Number(data['Puntos instalados']) || 0 },
            { 'Puntos existentes': Number(data['Puntos existentes']) || 0 },
            { 'Puntos repuestos': Number(data['Puntos repuestos']) || 0 },
            { 'Peso cebo instalado (gramos)': Number(data['Peso cebo instalado (gramos)']) || 0 },
            { 'Puntos físicos instalados': Number(data['Puntos físicos instalados']) || 0 },
            { 'Puntos físicos existentes': Number(data['Puntos físicos existentes']) || 0 },
            { 'Puntos físicos repuestos': Number(data['Puntos físicos repuestos']) || 0 },
          ]
        : service.serviceType === ServiceTypes.DESINSECTACIÓN
        ? [
            { TUV: Number(data['TUV']) || 0 },
            { 'Dispositivos instalados': Number(data['Dispositivos instalados']) || 0 },
            { 'Dispositivos existentes': Number(data['Dispositivos existentes']) || 0 },
            { 'Dispositivos repuestos': Number(data['Dispositivos repuestos']) || 0 },
          ]
        : []

    const payload: RegisterServiceDataUploadDTO = {
      serviceType: service.serviceType,
      serviceId: service._id,
      clientId: service.clientId._id,
      dosage,
      devices,
      product: data.product,
      sites: data.sites,
      description: data.description,
      signatures: {
        client: signatures.clientSign,
        technical: signatures.technicalSign,
      },
      geolocation: gps ? { lat: gps.lat, lng: gps.lng } : null,
    }

    if (service.serviceType !== ServiceTypes.DESRATIZACIÓN) {
      finishDataupload(payload)
    } else {
      if (obsFinal.length > 0) {
        uploadObsImageToCloudinary(data, devices)
      } else {
        finishDataupload(payload)
      }
    }
  }

  const uploadObsImageToCloudinary = async (data, devices) => {
    const promises = []
    for (const key in obsFinal) {
      if (obsFinal[key]?.image) {
        // Reducir la calidad de la imagen
        const reducedQualityImage = await reduceImageQuality(obsFinal[key].image.file, 0.7)

        const formData = await getImageFormData(
          reducedQualityImage as File,
          `EC-${obsFinal[key].ec}`,
          getFolderCloudinary(service._id, service.serviceType, true)
        )
        promises.push(api.cloudinary.uploadImg(formData))
      }
    }

    Promise.all(promises)
      .then(results => {
        const obsPayload = []
        obsFinal.forEach(obs => {
          const image = results.find(res => res.public_id?.includes(`EC-${obs.ec}`))
          if (image) {
            obsPayload.push({
              ec: obs.ec,
              obs: obs.obs,
              detail: obs.detail,
              image: { publicId: image.public_id, url: image.url },
            })
          } else {
            obsPayload.push({
              ec: obs.ec,
              obs: obs.obs,
              detail: obs.detail,
            })
          }
        })

        const obs: ObservationPayload = {
          total: {
            gnawed: data.gnawed || 0,
            rodentSample: data.rodentSample || 0,
            stolen: data.stolen || 0,
            destroyed: data.destroyed || 0,
            fungus: data.fungus || 0,
            dust: data.dust || 0,
            rodentCapture: data.rodentCapture || 0,
            blocked: data.blocked || 0,
            slug: data.slug || 0,
            installedPoints: data.installedPoints || 0,
            noActivityTotal: data.noActivityTotal || 0,
          },
          activities: obsPayload,
        }

        const payload: RegisterServiceDataUploadDTO = {
          serviceType: service.serviceType,
          serviceId: service._id,
          clientId: service.clientId._id,
          devices,
          product: data.product,
          sites: data.sites,
          description: data.description,
          observations: obs,
          signatures: {
            client: signatures.clientSign,
            technical: signatures.technicalSign,
          },
          geolocation: gps ? { lat: gps.lat, lng: gps.lng } : null,
        }

        finishDataupload(payload)
      })
      .catch(err => {
        toast.error(`Error al cargar las imagenes: ${err.status} - ${err.message}`)
        setIsLoading(false)
      })
  }

  const finishDataupload = async (payload: RegisterServiceDataUploadDTO) => {
    const response = await api.dataupload.registerDataupload<{ id: string }>(payload)
    if (response.status === 201) {
      toast.success(response.message)
      if (images.length > 0) {
        toast.loading('Subiendo imágenes...')
        const promises = []
        for (const key in images) {
          // Reducir la calidad de la imagen
          const reducedQualityImage = await reduceImageQuality(images[key].file, 0.7)

          const formData = await getImageFormData(
            reducedQualityImage as File,
            null,
            getFolderCloudinary(service._id, service.serviceType)
          )
          promises.push(api.cloudinary.uploadImg(formData))
        }
        Promise.all(promises)
          .then(results => {
            const imagesUploaded = results.map(result => ({
              publicId: result.public_id,
              url: result.url,
            }))
            const payload: UploadImageDatauploadDTO = {
              images: imagesUploaded,
            }
            uploadImagesToDataupload(response.data.id, payload)
          })
          .catch(err => {
            toast.error(`Error al cargar las imagenes: ${err.status} - ${err.message}`)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
        router.push(`/services/${service._id}`)
      }
    } else {
      toast.error(response.message)
      setIsLoading(false)
    }
  }

  const uploadImagesToDataupload = async (
    datauploadId: string,
    payload: UploadImageDatauploadDTO
  ) => {
    const response = await api.dataupload.uploadImagesDataupload(datauploadId, payload)
    if (response.status === 200) {
      toast.success(response.message)
      router.push(`/services/${service._id}`)
    } else {
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  const handleOnShowModal = () => setShowObsModal(prevState => !prevState)

  const handleOnImageSelected = (file: File) => {
    if (file) {
      updateImageState(file)
    }
  }

  const handleShowSignModal = () => {
    setShowSignModal(prevState => !prevState)
  }

  const handleOnSign = () => {
    const base64toBlob = async b64 => {
      const blob = await fetch(b64)
      return blob
    }

    base64toBlob(clientSignRef.current.getTrimmedCanvas().toDataURL('image/png')).then(result => {
      setSignatures(prevState => ({ ...prevState, clientSign: result.url }))
    })

    base64toBlob(technicalSignRef.current.getTrimmedCanvas().toDataURL('image/png')).then(
      result => {
        setSignatures(prevState => ({ ...prevState, technicalSign: result.url }))
      }
    )

    handleShowSignModal()
  }

  const updateImageState = (file: File) => {
    setImages(prevState => [...prevState, { blob: URL.createObjectURL(file), file }])
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setGps({ lat: position.coords.latitude, lng: position.coords.longitude })
        },
        err => toast.error('No se pudo obtener la geolocalización. Error: ' + err)
      )
    }
  }, [])

  const renderForm = () => {
    switch (service.serviceType) {
      case ServiceTypes.DESRATIZACIÓN:
        return (
          <form id={ServiceTypes.DESRATIZACIÓN} onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={service.serviceType !== ServiceTypes.DESRATIZACIÓN}>
              <ServiceTypeSection
                control={control}
                section={ServiceTypes.DESRATIZACIÓN}
                service={service}
                products={desratizacionProducts.products}
                devices={desratizacionDevices.devices}
                handleOnShowModal={handleOnShowModal}
              />
            </fieldset>
          </form>
        )

      case ServiceTypes.DESINFECCIÓN:
        return (
          <form id={ServiceTypes.DESINFECCIÓN} onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={service.serviceType !== ServiceTypes.DESINFECCIÓN}>
              <ServiceTypeSection
                control={control}
                section={ServiceTypes.DESINFECCIÓN}
                service={service}
                products={desinfeccionProducts.products}
              />
            </fieldset>
          </form>
        )

      case ServiceTypes.DESINSECTACIÓN:
        return (
          <form id={ServiceTypes.DESINSECTACIÓN} onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={service.serviceType !== ServiceTypes.DESINSECTACIÓN}>
              <ServiceTypeSection
                control={control}
                section={ServiceTypes.DESINSECTACIÓN}
                service={service}
                products={desinsectacionProducts.products}
                devices={desinsectacionDevices.devices}
              />
            </fieldset>
          </form>
        )

      default:
        return (
          <form id={service.serviceType} onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <ServiceTypeSection control={control} section={'CUSTOM'} service={service} />
            </fieldset>
          </form>
        )
    }
  }

  return (
    <div className="flex w-full h-full items-center justify-center px-1 py-3 min-h-fit">
      <div className="flex flex-col bg-white justify-between rounded-lg px-3 pt-2 pb-5 w-full h-full min-h-fit">
        <div>
          <HeaderOverFlowUI title="Servicios realizados" />
          {renderForm()}
          <div className="flex justify-end">
            <div className="flex justify-center lg:justify-end w-full mb-3">
              <ButtonUI
                text="Firmar"
                type="button"
                classname="secondary"
                onClick={() => handleShowSignModal()}
              />
            </div>
          </div>
          <div className="flex justify-center flex-col lg:flex-row">
            {images?.map(({ blob }, i) => (
              <div key={i} className="lg:basis-3/12 flex justify-center">
                <div className="bg-gray-light rounded-lg min-h-24 w-36 relative lg:min-h-40 lg:min-w-40">
                  <Image
                    src={blob}
                    alt="image"
                    layout="fill"
                    objectFit="center"
                    className="rounded-lg"
                  />
                </div>
              </div>
            ))}
            {images?.length <= 2 && (
              <div className="basis-3/12 flex justify-center">
                <div className="bg-gray-light rounded-lg min-h-24 w-36 relative lg:min-h-40 lg:min-w-40">
                  <div className="flex items-center justify-center h-full min-h-24 lg:min-h-40 lg:min-w-40">
                    <i>
                      <AddPhotoIcon width="48" height="48" fill={colors.gray.DEFAULT} />
                    </i>
                  </div>
                  <input type="file" onChange={ev => handleOnImageSelected(ev.target.files[0])} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonUI
            type="submit"
            text="Finalizar"
            formId={service.serviceType}
            isLoading={isLoading}
          />
        </div>
      </div>
      {/* Obsrvation Modal */}
      <ObservationsModal
        title="Observaciones"
        visible={showObsModal}
        onClose={() => handleOnShowModal()}
        setObsFinal={setObsFinal}
      />

      <ModalUI title={`Firmas`} visible={showSignModal} onClose={() => handleShowSignModal()}>
        <div className="py-3 flex flex-col gap-3">
          {/* Firma cliente */}
          <div>
            <label className="font-semibold">Firma del cliente</label>
            <SignaturePad
              ref={clientSignRef}
              canvasProps={{
                style: {
                  width: '100%',
                  height: session.isMobile ? 200 : 'auto',
                  border: `1px solid ${colors.primary.DEFAULT}`,
                  borderRadius: '8px',
                },
              }}
            />
          </div>
          {/* Firma Tecnico */}
          <div>
            <label className="font-semibold">Firma del técnico</label>
            <SignaturePad
              ref={technicalSignRef}
              canvasProps={{
                style: {
                  width: '100%',
                  height: session.isMobile ? 200 : 'auto',
                  border: `1px solid ${colors.primary.DEFAULT}`,
                  borderRadius: '8px',
                },
              }}
            />
          </div>
          <ButtonUI text="Guardar" type="button" onClick={() => handleOnSign()} />
        </div>
      </ModalUI>
    </div>
  )
}

export default ExecuteServiceScreen
