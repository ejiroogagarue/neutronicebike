export const BUTTON_BASE_FOCUS =
	"focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export const BUTTON_PILL_BASE =
	"inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] px-6 sm:px-8 rounded-full text-sm sm:text-base font-semibold transition-colors";

export const BUTTON_PILL_PRIMARY = `${BUTTON_PILL_BASE} bg-primary text-primary-foreground hover:opacity-90 ${BUTTON_BASE_FOCUS} focus-visible:ring-offset-[#fdfdfd]`;

export const BUTTON_PILL_GHOST = `${BUTTON_PILL_BASE} border border-border text-foreground hover:bg-muted ${BUTTON_BASE_FOCUS} focus-visible:ring-offset-[#fdfdfd]`;

export const FORM_SELECT_CLASS =
	"flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";

export const FORM_TEXTAREA_CLASS =
	"flex min-h-28 w-full rounded-lg border border-input bg-background px-3 py-2 text-base shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";

export const SECTION_CONTAINER = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

export const SECTION_Y = "py-6 sm:py-8 lg:py-10";

export const SECTION_DIVIDER_TOP = "mt-6 sm:mt-8 lg:mt-10 border-t border-border pt-5 sm:pt-6 lg:pt-8";

export const HEADING_PAGE = "text-2xl sm:text-3xl md:text-4xl font-semibold italic";

export const HEADING_SECTION = "text-lg sm:text-xl lg:text-2xl font-semibold";

export const BODY_COPY = "text-sm sm:text-base text-muted-foreground";
