import { Activity } from '@/api/dataupload/type'
import Input from '@/components/input'
import Image from 'next/image'

const ObservationsDetail: React.FC<{ observations: Activity[] }> = ({ observations }) => {
  return (
    <div className="py-3">
      <h3 className="text-lg font-semibold mb-3">Observaciones</h3>
      <div className="flex basis-[30%] gap-x-1 font-semibold">
        <span className="basis-10">EC</span>
        <span className="basis-14">OBS</span>
        <span className="flex-1">Detalle</span>
      </div>
      <div className="flex flex-wrap gap-y-3 gap-x-5 h-max">
        {observations?.map((act, i) => (
          <div key={i} className="flex basis-full lg:basis-[30%] gap-x-1">
            <span className="basis-10">
              <Input border="outlined" inputType="number" name="ec" value={act.ec} disabled />
            </span>
            <span className="basis-14">
              <Input border="outlined" inputType="number" name="obs" value={act.obs} disabled />
            </span>
            <span className="flex-1">
              <Input
                border="underlined"
                width="w-full"
                name="detail"
                value={act.detail ?? '--'}
                disabled
              />
            </span>
            <span>
              <div className="flex w-8 h-8 relative">
                {act?.image?.url && (
                  <Image
                    src={act.image.url}
                    alt="image"
                    layout="fill"
                    objectFit="center"
                    className="rounded-lg"
                  />
                )}
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ObservationsDetail
