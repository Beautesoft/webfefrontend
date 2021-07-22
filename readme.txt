Multi language instructions

Class Component
    - import { withTranslation } from "react-i18next"
    - Wrap and export the class with withTranslation()(Class)
    - use t from props to as the translate function (let {t} = this.props; )
    - translate eg :- {t('translatable text')}

Functional Component
    - import { useTranslation } from "react-i18next"
    - get the translate function by :- const { t } = useTranslation();
    - translate eg :- {t('translatable text')}