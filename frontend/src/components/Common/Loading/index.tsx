import React from 'react'

interface Props {
    size?: number
}

const Loading = ({ size = 6 }: Props) => {
    return (
        <div className={`size-${size} grid place-items-center animate-spin`}>
            <svg
                className={`size-${size}`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    opacity="0.125"
                    d="M18.4403 4.36337L15.3856 7.41807C14.917 7.8867 14.917 8.6465 15.3856 9.11513C15.8543 9.58376 16.6141 9.58376 17.0827 9.11513L20.1374 6.06043C20.606 5.5918 20.606 4.832 20.1374 4.36337C19.6688 3.89474 18.909 3.89474 18.4403 4.36337Z"
                    className="fill-[#999999] dark:fill-[#777777]"
                />
                <path
                    opacity="0.25"
                    d="M22.1001 10.7998H17.7801C17.1173 10.7998 16.5801 11.3371 16.5801 11.9998C16.5801 12.6625 17.1173 13.1998 17.7801 13.1998H22.1001C22.7628 13.1998 23.3001 12.6625 23.3001 11.9998C23.3001 11.3371 22.7628 10.7998 22.1001 10.7998Z"
                    className="fill-[#999999] dark:fill-[#777777]"
                />
                <path
                    opacity="0.375"
                    d="M20.1376 17.9399L17.0829 14.8851C16.6143 14.4165 15.8545 14.4165 15.3858 14.8851C14.9172 15.3538 14.9172 16.1136 15.3858 16.5822L18.4405 19.6369C18.9092 20.1055 19.669 20.1055 20.1376 19.6369C20.6062 19.1683 20.6062 18.4085 20.1376 17.9399Z"
                    className="fill-[#999999] dark:fill-[#777777]"
                />
                <path
                    opacity="0.5"
                    d="M13.6992 21.6001V17.2801C13.6992 16.6173 13.162 16.0801 12.4992 16.0801C11.8365 16.0801 11.2992 16.6173 11.2992 17.2801V21.6001C11.2992 22.2628 11.8365 22.8001 12.4992 22.8001C13.162 22.8001 13.6992 22.2628 13.6992 21.6001Z"
                    className="fill-[#999999] dark:fill-[#777777]"
                />
                <path
                    opacity="0.625"
                    d="M6.55966 19.6366L9.61436 16.5819C10.083 16.1133 10.083 15.3535 9.61436 14.8849C9.14573 14.4162 8.38593 14.4162 7.91731 14.8849L4.8626 17.9396C4.39397 18.4082 4.39397 19.168 4.8626 19.6366C5.33123 20.1053 6.09103 20.1053 6.55966 19.6366Z"
                    className="fill-[#999999] dark:fill-[#777777]"
                />
                <path
                    opacity="0.75"
                    d="M2.89992 13.2002H7.21992C7.88266 13.2002 8.41992 12.6629 8.41992 12.0002C8.41992 11.3375 7.88266 10.8002 7.21992 10.8002H2.89992C2.23718 10.8002 1.69992 11.3375 1.69992 12.0002C1.69992 12.6629 2.23718 13.2002 2.89992 13.2002Z"
                    className="fill-[#999999] dark:fill-[#777777]"
                />
                <path
                    opacity="0.875"
                    d="M4.86239 6.06015L7.9171 9.11485C8.38573 9.58348 9.14552 9.58348 9.61415 9.11485C10.0828 8.64622 10.0828 7.88642 9.61415 7.41779L6.55945 4.36309C6.09082 3.89446 5.33102 3.89446 4.86239 4.36309C4.39377 4.83172 4.39377 5.59152 4.86239 6.06015Z"
                    className="fill-[#999999] dark:fill-[#777777]"
                />
            </svg>
        </div>
    )
}

export default Loading
