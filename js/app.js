// Function to update the copyright year dynamically
function updateYear() {
    // Get the current year
    document.getElementById("currentYear").textContent = new Date()
        .getFullYear()
        .toString(); // Set the current year in the HTML
}

// Call the function when the page loads
window.onload = updateYear;

function jumpLetterAnimation() {

    // Get all icon-box elements
    const iconBoxes = document.getElementsByClassName('icon-box');

    Array.from(iconBoxes).forEach((iconBox) => {
        const textElement = iconBox.querySelector('.jump-animated-text');
        const text = textElement.textContent;
        textElement.innerHTML = '';

        // Wrap each letter in a span for the jump effect
        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            textElement.appendChild(span);
        });

        // Add hover event listener to icon-box to trigger animation on text
        iconBox.addEventListener('mouseenter', () => {
            const spans = textElement.querySelectorAll('span');
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.animation = 'jump 0.3s ease';
                }, index * 100); // Adjust the delay timing between letters
            });
        });

        // Remove the animation when hover ends
        iconBox.addEventListener('mouseleave', () => {
            const spans = textElement.querySelectorAll('span');
            spans.forEach((span) => {
                span.style.animation = '';
            });
        });
    });

}

function aboutTypingAnimation() {
    const items = [
        {
            question: "Who am I?",
            text: "I’m Andres Mena, a passionate Software Engineering student with a focus on backend development. I specialize in building scalable systems, designing databases, and learning how to develop secure APIs. My goal is to create efficient and reliable software solutions that solve real-world problems."
        },
        {
            question: "What drives my passion?",
            text: "My passion lies in solving complex problems through code. I enjoy the process of designing systems that are not only functional but also efficient and secure. I believe that technology has the power to transform industries and improve lives, and I want to be a part of that transformation."
        },
        {
            question: "How does this help others?",
            text: "Through my work, I aim to develop software that simplifies processes, enhances security, and improves user experiences. Whether it's building a robust backend for an application or optimizing database performance, my goal is to create solutions that make technology more accessible and reliable for everyone."
        },
        {
            question: "What will always come next?",
            text: "Continuous learning and growth. I’m committed to staying updated with the latest technologies and best practices in software development. I’m always looking for new challenges and opportunities to expand my skill set and contribute to innovative projects."
        }
    ];

    const questionElement = document.querySelector('.heading-secondary');
    const textElement = document.querySelector('.introduction-letters p');
    let itemIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isQuestionTyped = false;

    // Define different speeds for question and text typing
    const questionTypingSpeed = 40;
    const textTypingSpeed = 15;
    const deletingSpeed = 10;

    function type() {
        const currentItem = items[itemIndex];

        if (!isDeleting) {
            // Typing the question and text
            if (!isQuestionTyped) {
                const question = currentItem.question;
                questionElement.textContent = question.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === question.length) {
                    isQuestionTyped = true;
                    charIndex = 0; // Reset for typing the text
                    setTimeout(type, 500); // Pause before typing the paragraph
                    return;
                }
            } else {
                const text = currentItem.text;
                textElement.textContent = text.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === text.length) {
                    // Finished typing the full text, set to delete
                    setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, 10000); // Pause before deleting
                    return;
                }
            }
        } else {
            // Deleting both the question and text
            if (isQuestionTyped) {
                // Start deleting from the end of the text
                const text = currentItem.text;
                if (charIndex > 0) {
                    textElement.textContent = text.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    isQuestionTyped = false;
                    charIndex = currentItem.question.length; // Move to delete question
                }
            } else {
                // Delete the question
                const question = currentItem.question;
                if (charIndex > 0) {
                    questionElement.textContent = question.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    // Fully deleted, move to the next item
                    isDeleting = false;
                    itemIndex = (itemIndex + 1) % items.length;
                }
            }
        }

        // Use different speeds based on the typing phase
        let typingSpeed = isDeleting ? deletingSpeed : (isQuestionTyped ? textTypingSpeed : questionTypingSpeed);
        setTimeout(type, typingSpeed);
    }

    type();
}

jumpLetterAnimation();
aboutTypingAnimation();