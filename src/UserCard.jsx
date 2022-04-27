import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LinkIcon from '@mui/icons-material/Link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EmailIcon from '@mui/icons-material/Email'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import styles from './hoverEffectHori.module.css'
import { Tooltip } from '@chakra-ui/react'

function UserCard({ template, data, reff }) {
  return (
    <div ref={reff} className="border border-gray-400 px-3 lg:px-6 py-3 lg:py-5 bg-slate-100">
      <div className="text-xl lg:text-2xl font-bold leading-6 lg:leading-6 border-b border-gray-300 pb-[2px] lg:pb-[4px]">
        {template ? (
          <div className="flex items-center">
            <SkeletonCircle />
            <div className="ml-4 grow">
              <SkeletonText noOfLines={1} />
            </div>
          </div>
        ) : (
          <>
            <span>{data.name}</span>
            <span className="block lg:inline text-sm lg:text-base text-gray-500 font-medium lg:ml-2">
              {'@' + data.username}
            </span>
          </>
        )}
      </div>
      <div className="mt-1 text-xs lg:text-base lg:flex">
        {template ? (
          <div className="w-full">
            <SkeletonText noOfLines={1} />
          </div>
        ) : (
          <>
            <div className="font-bold flex items-center grow shrink basis-auto">
              <EmailIcon sx={{ fontSize: 14 }} />
              <div className="mx-1">
                <a className="text-blue-500" href={'mailto:' + data.email}>
                  {data.email}
                </a>
              </div>
            </div>
            <div className="font-bold flex items-center grow shrink basis-auto">
              <LinkIcon sx={{ fontSize: 14 }} />
              <div className="mx-1">
                <a className="text-blue-500" href="/">
                  {data.website}
                </a>
              </div>
            </div>
            <div className="font-bold flex items-center grow shrink basis-auto">
              <LocalPhoneIcon sx={{ fontSize: 14 }} />
              <div className="mx-1">
                {data.phone
                  .split(/[-.\s]/)
                  .filter((part) => part[0] !== 'x')
                  .join(' ')}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-1 lg:mt-2 space-y-1 lg:space-y-0">
        <div className="text-xs lg:text-base">
          <div className="text-sm lg:text-lg text-slate-500 border-b border-gray-300">Address</div>
          {template ? (
            <SkeletonText />
          ) : (
            <p className="font-bold">
              <Tooltip label={'Copy to clipboard'}>
                <span
                  className={styles.highlight}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${data.address.suite} ${data.address.street}, ${data.address.city} ${data.address.zipcode}`,
                    )
                  }}
                >
                  {`${data.address.suite} ${data.address.street}, ${data.address.city} ${data.address.zipcode}`}
                </span>
              </Tooltip>
            </p>
          )}
        </div>
        <div className="text-xs lg:text-base">
          <div className="text-sm lg:text-lg text-slate-500 border-b border-gray-300">Company</div>
          {template ? (
            <SkeletonText />
          ) : (
            <>
              <p className="font-bold">
                <Tooltip label={'Copy to clipboard'}>
                  <span
                    className={styles.highlight}
                    onClick={() => {
                      navigator.clipboard.writeText(data.company.name)
                    }}
                  >
                    {data.company.name}
                  </span>
                </Tooltip>
              </p>
              <p className="">{data.company.catchPhrase}</p>
              <p className="">{data.company.bs}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserCard
