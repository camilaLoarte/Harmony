import { submitContactForm } from '../app/actions/contact-actions'

async function main() {
    console.log('Testing validation...')

    // Create empty form data
    const formData = new FormData()
    // No fields added

    const result = await submitContactForm(null, formData)

    console.log('Submission Result:', JSON.stringify(result, null, 2))

    if (result.success === false && result.errors) {
        console.log('Validation test PASSED: Field errors returned.')
    } else {
        console.error('Validation test FAILED: Unexpected result.')
    }
}

main()
