import Icon from '@/components/Common/Icon'

export default function Home() {
  return (
    <div className="flex h-full w-full justify-center px-[76px]">
      <div className="h-full w-[640px]">
        <div className="grid h-15 w-full place-items-center">
          <div className="flex items-center gap-2">
            <span className="block text-15px font-medium">For you</span>
            <div className="relative">
              <div className="grid h-[24px] w-[24px] cursor-pointer place-items-center rounded-full border bg-content shadow duration-75 ease-linear hover:scale-110">
                <Icon name="arrow_down_home_section_black" className="dark:hidden" size={12} />
                <Icon name="arrow_down_home_section_white" className="hidden dark:block" size={12} />
              </div>
              <div className="absolute left-1/2 top-[calc(100%+6px)] w-[224px] -translate-x-1/2 rounded-2xl border p-2 shadow">
                <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                  <div className="flex h-7 w-full items-center justify-between">
                    <span className="font-medium">For you</span>
                    <div>
                      <Icon name="check_home_select_section_black" className="dark:hidden" size={16} />
                      <Icon name="check_home_select_section_white" className="hidden dark:block" size={16} />
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                  <div className="flex h-7 w-full items-center justify-between">
                    <span className="font-medium">Following</span>
                    <div></div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                  <div className="flex h-7 w-full items-center justify-between">
                    <span className="font-medium">Liked</span>
                    <div></div>
                  </div>
                </div>
                <div className="cursor-pointer rounded-xl p-3 hover:bg-content-hover">
                  <div className="flex h-7 w-full items-center justify-between">
                    <span className="font-medium">Saved</span>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
