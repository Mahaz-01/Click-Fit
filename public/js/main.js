$(document).ready(function() {
    // AJAX call to Numbers API
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#fact-content').html(data.text);
        },
        error: function() {
            $('#fact-content').html('Could not load today\'s fact. Please try again later.');
        }
    });
    
    // Fade in animations
    $(window).scroll(function() {
        $('.fade-in').each(function() {
            var position = $(this).offset().top;
            var scrollPosition = $(window).scrollTop() + $(window).height() - 100;
            
            if (position < scrollPosition) {
                $(this).addClass('visible');
            }
        });
    });
    
    // Trigger scroll once to check initial positions
    $(window).scroll();
    
    // Stats counter animation
    function animateStats() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var finalValue = parseInt($this.data('val'));
            
            $({ countValue: 0 }).animate({ countValue: finalValue }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countValue));
                },
                complete: function() {
                    $this.text(finalValue);
                }
            });
        });
    }
    
    // Check if stats section is in viewport
    function isInViewport(element) {
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
    
    var statsAnimated = false;
    $(window).scroll(function() {
        if (isInViewport('.stats-section') && !statsAnimated) {
            statsAnimated = true;
            animateStats();
        }
    });
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').css('padding', '10px 0');
        } else {
            $('.navbar').css('padding', '20px 0');
        }
    });
    
    // File upload functionality
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadPreview = document.getElementById('upload-preview');
    const uploadStatus = document.getElementById('upload-status');
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
        uploadArea.style.backgroundColor = '#fff';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = '#f8f9fa';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = '#f8f9fa';
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });
    
    function handleFiles(files) {
        if (files.length === 0) return;
        
        uploadStatus.innerHTML = '<div class="alert alert-info mt-3">Uploading files...</div>';
        const formData = new FormData();
        
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                formData.append('images', file);
                
                // Show preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewDiv = document.createElement('div');
                    previewDiv.className = 'col-md-4 mb-3';
                    previewDiv.innerHTML = `
                        <div class="card">
                            <img src="${e.target.result}" class="card-img-top" alt="Preview">
                            <div class="card-body">
                                <p class="card-text">${file.name}</p>
                            </div>
                        </div>
                    `;
                    uploadPreview.appendChild(previewDiv);
                };
                reader.readAsDataURL(file);
            }
        }
        
        // AJAX file upload
        $.ajax({
            url: '/upload',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function() {
                uploadStatus.innerHTML = '<div class="alert alert-success mt-3">Files uploaded successfully!</div>';
            },
            error: function() {
                uploadStatus.innerHTML = '<div class="alert alert-danger mt-3">Error uploading files. Please try again.</div>';
            }
        });
    }
    
    // Handle link clicks for demonstration
    $('a').on('click', function(e) {
        const href = $(this).attr('href');
        if (href === '#') {
            e.preventDefault();
            alert('This is a demonstration website. Only the main page is functional.');
        }
    });
});